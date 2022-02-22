const homeView = require('../views/home_view.js');
const utils = require('../../utils/utils.js');

const sharedChannelInviteAccepted = async (
    {context, client, event, body},
) => {
  const userID = body.event.accepting_user.id;
  const homeblocks = await homeView.homeBlocks();
  const inviteBlocks = await utils.listInvites(client, userID);
  const newBlocks = await homeblocks.concat(inviteBlocks);

  const result = await client.views.publish({
    user_id: userID,
    view: {
      type: 'home',
      blocks: newBlocks,
      private_metadata: userID,
    },
  });

  return result;
};

module.exports = {sharedChannelInviteAccepted};
