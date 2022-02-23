const homeView = require('../views/home_view.js');
const listInvites = require('./../../utils/list_invites')

const denyInvite = async ({ack, client, action, body}) => {
  try {
    await ack();

    const text = action.value;
    const inviteInfo = text.split(',');
    const awayTeam = inviteInfo[1];
    const inviteId = inviteInfo[0];

    const declineResp = await client.conversations.declineSharedInvite({
      invite_id: inviteId,
      target_team: awayTeam,
    });

    if (!declineResp.ok) {
      console.error(declineResp);
      return;
    } else {
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
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {denyInvite};
