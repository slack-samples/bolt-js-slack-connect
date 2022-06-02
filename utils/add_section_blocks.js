// const addSectionBlocks = async (
//   curInviteLink,
//   curInviteID,
//   recipientEmail,
//   invitingTeamName,
//   invitingUserName,
//   curChannelName,
//   status,
// ) => {
//   // Build Block Kit section block when showing pending invitations (waiting to be accepted).
//   // To learn more about Block Kit Section Blocks => https://api.slack.com/reference/block-kit/blocks#section
//   const sectionWithInviteInfo = {
//     type: 'section',
//     text: {
//       type: 'mrkdwn',
//       text:
//           `<${curInviteLink}|Invite ${curInviteID}> \n`
//           + `*Invitation to*: ${recipientEmail} \n`
//           + `*Inviting Team*: ${invitingTeamName} \n`
//           + `*Inviting User*: ${invitingUserName} \n`
//           + `*Channel Name*: ${curChannelName} \n`
//           + `*Status*: ${status}`,
//     },
//   };
//   return sectionWithInviteInfo;
// };

// module.exports = addSectionBlocks;
