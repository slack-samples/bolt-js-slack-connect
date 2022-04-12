const addAcceptBlocks = async (
  inviteBlocks,
  inviteInfo,
  currentInvite,
  fileURL,
  blockText,
) => {
  let sectionWithFile;

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
            text: 'Accept Invite',
            emoji: true,
          },
          style: 'primary',
          url: currentInvite.invite.link,
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
