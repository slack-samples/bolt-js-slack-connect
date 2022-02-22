const sharedChannelInviteDeclined = async ({client, event, body}) => {
  try {
    await ack();

    console.log('sharedChannelInviteDeclined');
    console.log(event);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {sharedChannelInviteDeclined};
