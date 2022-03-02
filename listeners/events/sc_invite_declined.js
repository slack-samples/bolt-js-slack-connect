const sharedChannelInviteDeclined = async ({ event, ack }) => {
  try {
    await ack();
    console.log(event);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sharedChannelInviteDeclined };
