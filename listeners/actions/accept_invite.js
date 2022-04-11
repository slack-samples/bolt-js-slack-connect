const homeView = require('../views/home_view');
const listInvites = require('../../utils/list_invites');

const acceptInvite = async ({ ack, client, action, body }) => {
  try {
    await ack();

    const [inviteId, channelName, channelId] = action.value.split(',');

    await client.conversations.acceptSharedInvite({
      channel_name: channelName,
      channel_id: channelId,
      invite_id: inviteId,
    });

    const homeblocks = await homeView.homeBlocks();
    const inviteBlocks = await listInvites(client, action.value);
    const newBlocks = await homeblocks.concat(inviteBlocks);

    const result = await client.views.publish({
      user_id: body.user.id,
      view: {
        type: 'home',
        blocks: newBlocks,
        private_metadata: body.user.id,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = { acceptInvite };
