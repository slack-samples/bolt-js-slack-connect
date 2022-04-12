const homeView = require('../views/home_view');
const listInvites = require('../../utils/list_invites');

const sharedChannelInviteAccepted = async (
  { client, body, event },
) => {
  const userID = body.event.inviting_user.id;
  const homeblocks = await homeView.homeBlocks();
  const inviteBlocks = await listInvites(client, userID);
  const newBlocks = await homeblocks.concat(inviteBlocks);

  try {
    await client.views.publish({
      user_id: userID,
      view: {
        type: 'home',
        blocks: newBlocks,
        private_metadata: userID,
      },
    });
    console.log(event);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sharedChannelInviteAccepted };
