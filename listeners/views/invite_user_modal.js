const inviteUserBlock = async () => {
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
        text: 'Pick a (Slack Connect) channel to invite members to',
      },
    },

    {
      type: 'input',
      optional: true,
      block_id: 'email_input_block',
      element: {
        type: 'plain_text_input',
        action_id: 'email_input_actionID',
        placeholder: {
          type: 'plain_text',
          text: 'acme-corp@mail.com',
        },
      },
      label: {
        type: 'plain_text',
        text: 'Invite users via email',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Use *either* email or Slack userID to send an invite.',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'input',
      optional: true,
      block_id: 'userID_input_block',
      element: {
        type: 'plain_text_input',
        action_id: 'userID_actionID',
        placeholder: {
          type: 'plain_text',
          text: 'U012345678',
        },
      },
      label: {
        type: 'plain_text',
        text: 'Invite users via userID',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'input',
      optional: true,
      block_id: 'datepicker_input_block',
      element: {
        type: 'datepicker',
        action_id: 'datepicker_actionID',
      },
      label: {
        type: 'plain_text',
        text: 'Select a date to disconnect this channel.',
        emoji: true,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      block_id: 'is_external_limited_block',
      text: {
        type: 'mrkdwn',
        text:
          '*Pick a type of invite.* \n Normal means that this member can add'
          + 'members of their own workspace to the channel.'
          + 'Limited is, well, the opposite.',
      },
      accessory: {
        type: 'radio_buttons',
        action_id: 'this_is_an_action_id',
        initial_option: {
          value: 'Normal',
          text: {
            type: 'plain_text',
            text: 'Normal',
          },
        },
        options: [
          {
            value: 'Normal',
            text: {
              type: 'plain_text',
              text: 'Normal',
            },
          },
          {
            value: 'Limited',
            text: {
              type: 'plain_text',
              text: 'Limited',
            },
          },
        ],
      },
    },
  ];
  return blocks;
};

module.exports = { inviteUserBlock };
