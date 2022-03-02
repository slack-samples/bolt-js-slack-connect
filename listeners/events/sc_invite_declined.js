const sharedChannelInviteDeclined = async ({ event }) => {
  try {
    console.log(event);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sharedChannelInviteDeclined };
