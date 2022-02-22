const sharedChannelInviteApproved = async ({client, event, body}) => {
  try {
    await ack();
    console.log(event);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {sharedChannelInviteApproved};
