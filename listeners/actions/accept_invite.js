const homeView = require('../views/home_view.js');
const utils = require('../../utils/utils.js');

const acceptInvite = async ({ack, client, action, body}) => {
  try {
    await ack();

    const text = action.value;
    const acceptInfo = text.split(',');
    const inviteId = acceptInfo[0];
    const channelName = acceptInfo[1];
    const channelId = acceptInfo[2];

    const acceptResp = await client.conversations.acceptSharedInvite({
      channel_name: channelName,
      channel_id: channelId,
      invite_id: inviteId,
    });

    const homeblocks = await homeView.homeBlocks();
    const inviteBlocks = await utils.listInvites(client, action.value);
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
  }
};

module.exports = {acceptInvite};
