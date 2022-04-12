/* eslint-disable no-await-in-loop */

const addApproveBlocks = require('./add_approve_blocks');
const addAcceptBlocks = require('./add_accept_blocks');

const listInvites = async (client) => {
  const resp = await client.conversations.listConnectInvites();

  const inviteBlocks = [];
  let numInvites;

  // Slack API cannot have over 100 blocks in one view
  if (resp.invites.length > 100) {
    numInvites = 100;
  } else {
    numInvites = resp.invites.length;
  }

  for (let i = 0; i < numInvites; i += 1) {
    const currentInvite = resp.invites[i];

    if (currentInvite.acceptances !== undefined && currentInvite.status !== 'revoked' && currentInvite.status !== 'approved') {
      if (currentInvite.acceptances[0].approval_status !== 'approved') {
        addApproveBlocks(
          inviteBlocks,
          resp.invites[i],
          currentInvite,
          '',
          '',
        );
      }
    } else {
      addAcceptBlocks(
        inviteBlocks,
        resp.invites[i],
        currentInvite,
        '',
        '',
      );
    }
  }
  // need this to make sure all accept/approve blocks have finished being appended to inviteBlocks.
  // Without this the UI doesn't update properly.
  await inviteBlocks;
  return inviteBlocks;
};

module.exports = listInvites;
