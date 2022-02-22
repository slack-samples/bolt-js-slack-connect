const disconnectBlocks = async () => {
  const blocks = [
    {
      'type': 'input',
      'block_id': 'channel_select_block',
      'element': {
        'type': 'channels_select',
        'action_id': 'channels_select_actionID',
        'placeholder': {
          'type': 'plain_text',
          'text': 'Pick a channel',
        },
      },
      'label': {
        'type': 'plain_text',
        'text': 'Which channel do you want to disconnect from?',
      },
    },
  ];
  return blocks;
};

module.exports = {disconnectBlocks};
