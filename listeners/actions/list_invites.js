const homeView = require('../views/home_view');
const listInvites = require('../../utils/list_invites');

const listInvitesAction = async ({ ack, client, action, body }) => {
  try {
    await ack();

    const homeblocks = await homeView.homeBlocks();
    const inviteBlocks = await listInvites(client, action.value);
    const newBlocks = await homeblocks.concat(inviteBlocks);

    await client.views.publish({
      user_id: body.user.id,
      view: {
        type: 'home',
        blocks: newBlocks,
        private_metadata: body.user.id,
      },
    });

    return;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { listInvitesAction };
