const sharedChannelInviteDeclined = async ({ event }) => {
  try {
    console.log(event);
    // This means that someone has Declined your Slack Connect invite. This means that
    // the channel will not be connected. Your app should remove this invite from the
    // list of invites which are eligible to be accepted / approved.
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sharedChannelInviteDeclined };
