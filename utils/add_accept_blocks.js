const addAcceptBlocks = async (
  inviteBlocks,
  inviteInfo,
  currentInvite,
) => {
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
  inviteBlocks.push({ type: 'divider' });
  return inviteBlocks;
};

module.exports = addAcceptBlocks;
