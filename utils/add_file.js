const addApproveBlocks = require('./add_approve_blocks.js');
const addAcceptBlocks = require('./add_accept_blocks.js');

const addFile = async (inviteID, fileURL, client, userID) => {
    const resp = await client.conversations.listConnectInvites();
  
    const divider = {
      type: 'divider',
    };
    const inviteBlocks = [];
  
    let numInvites;
  
    // Slack API cannot have over 100 blocks in one view
    if (resp.invites.length > 100) {
      numInvites = 100;
    } else {
      numInvites = resp.invites.length;
    }
  
    for (let i = 0; i < numInvites.length; i++) {
      let blockText;
      const currentInvite = await resp.invites[i];
      const email = currentInvite.invite.recipient_email;
      if (inviteID == currentInvite.invite.id) {
        blockText =
          `<${currentInvite.invite.link}|Invite ${currentInvite.invite.id}> \n` +
          `Invitation to: ${email} \n` +
          `Inviting Team: ${currentInvite.invite.inviting_team.name} \n` +
          `Inviting User: ${currentInvite.invite.inviting_user.name} \n` +
          `Channel Name: ${currentInvite.channel.name} \n` +
          `Status: Not yet approved \n File: ${fileURL}`;
      } else {
        blockText =
          `<${currentInvite.invite.link}|Invite ${currentInvite.invite.id}> \n` +
          `Invitation to: ${email} \n` +
          `Inviting Team: ${currentInvite.invite.inviting_team.name} \n` +
          `Inviting User: ${currentInvite.invite.inviting_user.name} \n` +
          `Channel Name: ${currentInvite.channel.name} \n` +
          `Status: Not yet approved`;
      }
  
      if (
        currentInvite.status == 'revoked' || currentInvite.status == 'approved'
      ) {
        continue;
      }
  
      if (currentInvite.acceptances != undefined) {
        if (currentInvite.acceptances[0].approval_status == 'approved') continue;
  
        const awayTeamId = currentInvite.acceptances[0].accepting_team.id;
        const inviteInfo = currentInvite.invite.id + ',' + awayTeamId + ',' + userID;
        inviteBlocks.push(divider);
        await addApproveBlocks(
            inviteBlocks,
            inviteInfo,
            currentInvite,
            fileURL,
            blockText,
        );
      } else {
        const channelID = resp.invites[i].channel.id;
        const inviteID = resp.invites[i].invite.id;
        const channelName = resp.invites[i].channel.name;
        const acceptArg = inviteID + ',' + channelName + ',' + channelID + ',' +
          userID;
  
        inviteBlocks.push(divider);
        await addAcceptBlocks(
            inviteBlocks,
            acceptArg,
            currentInvite,
            fileURL,
            blockText,
        );
      }
    }
  
    return inviteBlocks;
  };

module.exports = addFile;
