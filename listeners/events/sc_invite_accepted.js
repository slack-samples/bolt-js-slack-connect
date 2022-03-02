const homeView = require('../views/home_view');
const listInvites = require('../../utils/list_invites');

const sharedChannelInviteAccepted = async (
  { client, event, body },
) => {
  console.log('event: ', event);
  const userID = body.event.accepting_user.id;
  const homeblocks = await homeView.homeBlocks();
  const inviteBlocks = await listInvites(client, userID);
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

module.exports = { sharedChannelInviteAccepted };
