const homeView = require('../views/home_view');
const listInvites = require('../../utils/list_invites');

const listInvitesAction = async ({ ack, client, action, body }) => {
  try {
    await ack();

    // Grab the Pending Invites (either have been accepted but not approved, or pending).
    const homeBlocks = await homeView.homeBlocks();
    const inviteBlocks = await listInvites(client, action.value);
    const newBlocks = homeBlocks.concat(inviteBlocks);

    // Update the App Home page with the latest Pending Invites
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
