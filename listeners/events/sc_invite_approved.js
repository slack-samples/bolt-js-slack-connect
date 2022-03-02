const sharedChannelInviteApproved = async ({ ack, event }) => {
  try {
    await ack();
    console.log(event);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sharedChannelInviteApproved };
