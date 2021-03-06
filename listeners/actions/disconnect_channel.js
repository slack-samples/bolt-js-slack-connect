const disconnectModal = require('../views/disconnect_channel_modal');

const disconnectChannel = async ({ ack, client, body }) => {
  try {
    await ack();
    // UI Logic to disconnect a channel.
    const disconnectBlocks = await disconnectModal.disconnectBlocks();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        notify_on_close: true,
        callback_id: 'disconnect_channel_callback',
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
