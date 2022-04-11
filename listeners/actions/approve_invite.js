const homeView = require('../views/home_view');
const listInvites = require('../../utils/list_invites');

const approveInvite = async ({ ack, client, action, body }) => {
  try {
    await ack();

    // action.value is used to pass in info such as inviteID and awayTeam
    const [inviteId, awayTeam] = action.value.split(',');

    // API call to approve the invite
    await client.conversations.approveSharedInvite({
      invite_id: inviteId,
      target_team: awayTeam,
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

module.exports = { approveInvite };
