// Define Block Kit blocks for the disconnect channel flow
const disconnectBlocks = async () => {
  const blocks = [
    {
      type: 'input',
      block_id: 'channel_select_block',
      element: {
        type: 'channels_select',
        action_id: 'channels_select_actionID',
        placeholder: {
          type: 'plain_text',
          text: 'Pick a channel',
        },
      },
      label: {
        type: 'plain_text',
        text: '🚨 Only Enterprise Grid Admins can use this feature. \n  \n '
        + 'Which channel do you want to disconnect from?',
      },
    },
  ];
  return blocks;
};

module.exports = { disconnectBlocks };
