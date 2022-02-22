const inviteModal = require('../views/invite_user_modal.js');

const submitSharedChannelInvite = async ({ack, client, action, body}) => {
  try {
    console.log('inside submit channel invite');
    const inviteUserBlocks = await inviteModal.inviteUserBlock();
    await ack();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        'type': 'modal',
        'notify_on_close': true,
        'callback_id': 'inviteSubmitted',
        'title': {
          'type': 'plain_text',
          'text': 'Slack Connect Invite',
        },
        'blocks': inviteUserBlocks,
        'submit': {
          'type': 'plain_text',
          'text': 'Invite',
        },
      },
    });
    return;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {submitSharedChannelInvite};
