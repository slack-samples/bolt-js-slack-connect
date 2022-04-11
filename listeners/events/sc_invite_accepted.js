const homeView = require('../views/home_view');
const listInvites = require('../../utils/list_invites');

const sharedChannelInviteAccepted = async (
  { client, event, body },
) => {
  try {
    console.log(event);
    // This means that someone has accepted your Slack Connect invite.
    // This logic below can update the app UI so that the user knows who accepted and which invite.
    const userID = body.event.accepting_user.id;
    const homeblocks = await homeView.homeBlocks();
    const inviteBlocks = await listInvites(client, userID);
    const newBlocks = homeblocks.concat(inviteBlocks);

    const result = await client.views.publish({
      user_id: userID,
      view: {
        type: 'home',
        blocks: newBlocks,
        private_metadata: userID,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = { sharedChannelInviteAccepted };
