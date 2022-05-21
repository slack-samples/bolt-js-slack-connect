const addApproveBlocks = async (
  inviteBlocks,
  inviteInfo,
  currentInvite,
) => {
  const inviteID = await inviteInfo.invite.id;
  const targetTeam = await inviteInfo.acceptances[0].accepting_team.id;

  const approveArgs = `${inviteID},${targetTeam},`;

  const sectionWithInviteInfo = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text:
        `<${currentInvite.invite.link}|Invite ${currentInvite.invite.id}> \n`
        + `*Invitation to*: ${currentInvite.invite.recipient_email} \n`
        + `*Inviting Team*: ${currentInvite.invite.inviting_team.name} \n`
        + `*Inviting User*: ${currentInvite.invite.inviting_user.name} \n`
        + `*Channel Name*: ${currentInvite.channel.name} \n`
        + '*Status*: Not yet accepted',
    },
  };

  inviteBlocks.push(sectionWithInviteInfo);
  inviteBlocks.push(
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Approve',
            emoji: true,
          },
          value: approveArgs,
          action_id: 'approve_action',
          style: 'primary',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Deny',
            emoji: true,
          },
          value: approveArgs,
          action_id: 'deny_action',
          style: 'danger',
          confirm: {
            title: {
              type: 'plain_text',
              text: 'Are you sure?',
            },
            text: {
              type: 'mrkdwn',
              text: 'Do you want to deny this Slack Connect invitation?',
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
      ],
    },
  );

  return inviteBlocks;
};

module.exports = addApproveBlocks;
