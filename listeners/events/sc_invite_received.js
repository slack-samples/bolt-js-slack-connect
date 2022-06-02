const sharedChannelInviteReceived = async ({ client, event }) => {
  try {
    console.log(event);

    // This means that someone has targeted a bot user to send an invite to them. If this is the
    // case, we will automatically accept the invite, and grab all info we need to accept from the
    // event. To automate further, you can set custom rules for your Organization by going into your
    // Orgs settings page, and looking for Slack Connect settings. In there, you can set custom
    // rules such that you never need to approve an invite from certain orgs. Only do this if you
    // have full trust in the org you are working with, since all channels will be auto approved.

    const channelName = await event.channel.name;
    const channelID = await event.channel.id;
    const isPrivateChannel = await event.channel.is_private;
    const inviteID = await event.invite.id;

    // accept the invite
    await client.conversations.acceptSharedInvite({
      channel_name: channelName,
      channel_id: channelID,
      is_private: isPrivateChannel,
      invite_id: inviteID,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sharedChannelInviteReceived };
