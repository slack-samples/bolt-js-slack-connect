const disconnectModal = require('../views/disconnect_channel_modal');

const disconnectChannel = async ({ ack, client, body }) => {
  try {
    await ack();
    const disconnectBlocks = await disconnectModal.disconnectBlocks();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        notify_on_close: true,
        callback_id: 'disconnect',
        title: {
          type: 'plain_text',
          text: 'Disconnect a Channel',
        },
        blocks: disconnectBlocks,
        submit: {
          type: 'plain_text',
          text: 'Disconnect',
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { disconnectChannel };
