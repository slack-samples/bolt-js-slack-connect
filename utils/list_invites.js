const addApproveBlocks = require('./add_approve_blocks.js');
const addAcceptBlocks = require('./add_accept_blocks.js');

const listInvites = async (client, userID) => {
    const resp = await client.conversations.listConnectInvites();
  
    const inviteBlocks = [];
    let numInvites;
  
    // Slack API cannot have over 100 blocks in one view
    if (resp.invites.length > 100) {
      numInvites = 100;
    } else {
      numInvites = resp.invites.length;
    }
  
    for (let i = 0; i < numInvites; i++) {
      const currentInvite = await resp.invites[i];
  
      if (
        currentInvite.status == 'revoked' || currentInvite.status == 'approved'
      ) {
        continue;
      }
  
      if (currentInvite.acceptances != undefined) {
        if (currentInvite.acceptances[0].approval_status == 'approved') continue;
        await addApproveBlocks(
            inviteBlocks,
            resp.invites[i],
            currentInvite,
            '',
            '',
        );
      } else {
        await addAcceptBlocks(
            inviteBlocks,
            resp.invites[i],
            currentInvite,
            '',
            '',
        );
      }
    }
  
    return inviteBlocks;
  };

module.exports = listInvites;