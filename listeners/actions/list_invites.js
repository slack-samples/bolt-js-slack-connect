const homeView = require('../views/home_view.js');
const utils = require('../../utils/utils.js');

const listInvites = async ({ack, client, action, body}) => {
  try {
    await ack();

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

module.exports = {listInvites};
