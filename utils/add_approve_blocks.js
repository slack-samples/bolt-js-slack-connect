const addApproveBlocks = async (
  inviteBlocks,
  inviteInfo,
  currentInvite,
) => {
  const inviteID = await inviteInfo.invite.id;
  const targetTeam = await inviteInfo.acceptances[0].accepting_team.id;

  const approveArgs = `${inviteID},${targetTeam},`;

  // Build Block Kit section block when showing accepted invitations (waiting to be approved).
  // To learn more about Block Kit Section Blocks => https://api.slack.com/reference/block-kit/blocks#section
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
        + '*Status*: Not yet approved',
    },
  };
  inviteBlocks.push(sectionWithInviteInfo);

  // Block Kit action block with button elements: https://api.slack.com/reference/block-kit/blocks#actions
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
          // what to send in the payload: https://api.slack.com/reference/block-kit/block-elements#button__fields
          value: approveArgs,
          // callback function to call when button is clicked: https://api.slack.com/reference/block-kit/block-elements#button__fields
          action_id: 'approve_action',
          // Red button color: https://api.slack.com/reference/block-kit/block-elements#button__fields
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
          // callback function to call when button is clicked: https://api.slack.com/reference/block-kit/block-elements#button__fields
          action_id: 'deny_action',
          // Red button color: https://api.slack.com/reference/block-kit/block-elements#button__fields
          style: 'danger',
          // follow up modal aka confirm object: https://api.slack.com/reference/block-kit/composition-objects#confirm
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
  inviteBlocks.push({ type: 'divider' });
  return inviteBlocks;
};

module.exports = addApproveBlocks;
