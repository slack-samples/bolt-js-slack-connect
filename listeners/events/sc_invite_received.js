const sharedChannelInviteReceived = async ({ event }) => {
  try {
    console.log(event);
    // This means that someone has sent a Slack Connect invite to your bot, using their
    // userID starting with U0123. This event is only received when using the
    // https://api.slack.com/methods/conversations.inviteShared API call with the `user_ids`
    // paramenter. The `user_ids` must the app's bot user userID. By installing this app on two
    // separate orgs, the orgs can automate the creation of Slack Connect Channels by simply
    // inviting the app's bot user via `user_ids` argument to conversations.inviteShared API call.
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sharedChannelInviteReceived };
