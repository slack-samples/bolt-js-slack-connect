/* eslint-disable max-len*/

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

const addApproveBlocks = async (
    inviteBlocks,
    inviteInfo,
    currentInvite,
    fileURL,
    blockText,
) => {
  console.log(inviteInfo);
  let sectionWithFile;
  const inviteID= await inviteInfo.invite.id;
  const targetTeam = await inviteInfo.acceptances[0].accepting_team.id;

  const approveArgs = inviteID + ',' + targetTeam + ',';

  if (fileURL.length > 0 && blockText.length > 0) {
    sectionWithFile = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: blockText,
      },
    };
  } else {
    sectionWithFile = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          `<${currentInvite.invite.link}|Invite ${currentInvite.invite.id}> \n`+
          `Invitation to: ${currentInvite.invite.recipient_email} \n` +
          `Inviting Team: ${currentInvite.invite.inviting_team.name} \n` +
          `Inviting User: ${currentInvite.invite.inviting_user.name} \n` +
          `Channel Name: ${currentInvite.channel.name} \n` +
          `Status: Not yet accepted`,
      },
    };
  }
  inviteBlocks.push({type: 'divider'});
  inviteBlocks.push(sectionWithFile);

  inviteBlocks.push(
      {
        'type': 'actions',
        'elements': [
          {
            'type': 'button',
            'text': {
              'type': 'plain_text',
              'text': 'Approve',
              'emoji': true,
            },
            'value': approveArgs,
            'action_id': 'approve_action',
            'style': 'primary',
          },
          {
            'type': 'button',
            'text': {
              'type': 'plain_text',
              'text': 'Deny',
              'emoji': true,
            },
            'value': approveArgs,
            'action_id': 'deny_action',
            'style': 'danger',
            'confirm': {
              'title': {
                'type': 'plain_text',
                'text': 'Are you sure?',
              },
              'text': {
                'type': 'mrkdwn',
                'text': 'Do you want to deny this Slack Connect invitation?',
              },
              'confirm': {
                'type': 'plain_text',
                'text': 'Yes',
              },
              'deny': {
                'type': 'plain_text',
                'text': 'No',
              },
            },
          },
          {
            'type': 'button',
            'text': {
              'type': 'plain_text',
              'text': 'Upload file',
              'emoji': true,
            },
            'value': currentInvite.invite.id,
            'action_id': 'upload_action',
          },
        ],
      },
  );

  return inviteBlocks;
};

const addAcceptBlocks = async (
    inviteBlocks,
    inviteInfo,
    currentInvite,
    fileURL,
    blockText,
) => {
  let sectionWithFile;
  const channelID = inviteInfo.channel.id;
  const inviteID = inviteInfo.invite.id;
  const channelNameFromInvInfo = inviteInfo.channel.name;

  const acceptArgs = inviteID + ',' + channelNameFromInvInfo + ',' + channelID +
    ',';

  if (fileURL.length > 0 && blockText.length > 0) {
    sectionWithFile = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: blockText,
      },
    };
  } else {
    sectionWithFile = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          `<${currentInvite.invite.link}|Invite ${currentInvite.invite.id}> \n`+
          `Invitation to: ${currentInvite.invite.recipient_email} \n` +
          `Inviting Team: ${currentInvite.invite.inviting_team.name} \n` +
          `Inviting User: ${currentInvite.invite.inviting_user.name} \n`+
          `Channel Name: ${currentInvite.channel.name} \n` +
          `Status: Not yet accepted`,
      },
    };
  }
  inviteBlocks.push({type: 'divider'});
  inviteBlocks.push(sectionWithFile);
  inviteBlocks.push(
      {
        'type': 'actions',
        'elements': [
          {
            'type': 'button',
            'text': {
              'type': 'plain_text',
              'text': 'Accept',
              'emoji': true,
            },
            'value': acceptArgs,
            'action_id': 'accept_action',
            'style': 'primary',
          },
          {
            'type': 'button',
            'text': {
              'type': 'plain_text',
              'text': 'Ignore',
              'emoji': true,
            },
            'value': currentInvite.invite.id,
            'action_id': 'deny_action',
            'confirm': {
              'title': {
                'type': 'plain_text',
                'text': 'Are you sure?',
              },
              'text': {
                'type': 'mrkdwn',
                'text': 'Do you want to ignore this Slack Connect invitation?',
              },
              'confirm': {
                'type': 'plain_text',
                'text': 'Yes',
              },
              'deny': {
                'type': 'plain_text',
                'text': 'No',
              },
            },
          },
          {
            'type': 'button',
            'text': {
              'type': 'plain_text',
              'text': 'Upload file',
              'emoji': true,
            },
            'value': currentInvite.invite.id,
            'action_id': 'upload_action',
          },
        ],
      },
  );

  return inviteBlocks;
};

const listInvites = async (client, userID) => {
  const resp = await client.conversations.listConnectInvites();
  console.log('resp length: ');
  console.log(resp.invites.length);

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

module.exports = {addFile, listInvites, addApproveBlocks, addAcceptBlocks};
