const inviteModal = require('../views/invite_user_modal');

const submitSharedChannelInvite = async ({ ack, client, body }) => {
  try {
    await ack();
    const inviteUserBlocks = await inviteModal.inviteUserBlock();

    // Open a model (form) to invite a user to a Slack Connect channel.
    // This is where you enter a User ID or email to invite.
    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        notify_on_close: true,
        callback_id: 'invite_submitted_callback',
        title: {
          type: 'plain_text',
          text: 'Slack Connect Invite',
        },
        blocks: inviteUserBlocks,
        submit: {
          type: 'plain_text',
          text: 'Invite',
        },
      },
    });
    return;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { submitSharedChannelInvite };
