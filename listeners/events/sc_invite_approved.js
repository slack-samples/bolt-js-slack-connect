const sharedChannelInviteApproved = async ({ event }) => {
  try {
    console.log(event);
    // This means that someone has Approved your Slack Connect invite. This step is often needed
    // (depending on Org settings) after an invite has been accepted. This event can be used
    // to notify Slack Connect Admins when a channel has been approved and is ready to be connected.
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sharedChannelInviteApproved };
