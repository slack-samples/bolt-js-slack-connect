const homeView = require('../views/home_view');
const listInvites = require('../../utils/list_invites');

const denyInvite = async ({ ack, client, action, body }) => {
  try {
    await ack();

    // Action.value is used to pass in info such as inviteID and awayTeam.
    const [inviteId, awayTeam] = action.value.split(',');

    // API call to decline invite
    const declineResp = await client.conversations.declineSharedInvite({
      invite_id: inviteId,
      target_team: awayTeam,
    });

    if (!declineResp.ok) {
      return;
    }
    const homeblocks = await homeView.homeBlocks();
    const inviteBlocks = await listInvites(client, action.value);
    const newBlocks = await homeblocks.concat(inviteBlocks);

    // Update UI to take out the newly declined invite.
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

module.exports = { denyInvite };
