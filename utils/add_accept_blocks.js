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

  const acceptArgs = `${inviteID},${channelNameFromInvInfo},${channelID
  },`;

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
          `<${currentInvite.invite.link}|Invite ${currentInvite.invite.id}> \n`
          + `Invitation to: ${currentInvite.invite.recipient_email} \n`
          + `Inviting Team: ${currentInvite.invite.inviting_team.name} \n`
          + `Inviting User: ${currentInvite.invite.inviting_user.name} \n`
          + `Channel Name: ${currentInvite.channel.name} \n`
          + 'Status: Not yet accepted',
      },
    };
  }
  inviteBlocks.push({ type: 'divider' });
  inviteBlocks.push(sectionWithFile);
  inviteBlocks.push(
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Accept',
            emoji: true,
          },
          value: acceptArgs,
          action_id: 'accept_action',
          style: 'primary',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Ignore',
            emoji: true,
          },
          value: currentInvite.invite.id,
          action_id: 'deny_action',
          confirm: {
            title: {
              type: 'plain_text',
              text: 'Are you sure?',
            },
            text: {
              type: 'mrkdwn',
              text: 'Do you want to ignore this Slack Connect invitation?',
            },
            confirm: {
              type: 'plain_text',
              text: 'Yes',
            },
            deny: {
              type: 'plain_text',
              text: 'No',
            },
          },
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Upload file',
            emoji: true,
          },
          value: currentInvite.invite.id,
          action_id: 'upload_action',
        },
      ],
    },
  );

  return inviteBlocks;
};

module.exports = addAcceptBlocks;
