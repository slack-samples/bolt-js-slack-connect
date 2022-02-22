const sharedChannelInviteReceived = async ({client, event, body}) => {
  try {
    console.log('sharedChannelInviteReceived');
    console.log(event);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {sharedChannelInviteReceived};
