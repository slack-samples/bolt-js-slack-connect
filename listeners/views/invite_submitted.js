const model = require('../../database/db_model');

const homeView = require('./home_view');

// Invite a user to a Slack Connect Channel
const inviteSubmittedCallback = async ({ ack, view, body, client }) => {
  try {
    await ack({
      response_action: 'clear',
    });

    const providedValues = view.state.values;
    const selectedChannel = await providedValues.channel_select_block
      .channels_select_actionID.selected_channel;

    // Set variables based on what user has picked.
    // User can use either email or userID.
    const userID = providedValues.userID_input_block.userID_actionID.value;
    const email = providedValues.email_input_block.email_input_actionID.value;
    // Datepicked is optional
    const datePicked = providedValues.datepicker_input_block.datepicker_actionID.selected_date;

    let withEmail = true;
    if (!email) {
      withEmail = false;
    }

    let isExternalLimited = await providedValues.is_external_limited_block
      .this_is_an_action_id.selected_option.value;
    if (isExternalLimited === 'Limited') {
      isExternalLimited = true;
    } else {
      isExternalLimited = false;
    }

    // send API request to send invite with email
    let resp;

    if (withEmail) {
      resp = await client.conversations.inviteShared({
        channel: selectedChannel,
        emails: email,
        external_limited: isExternalLimited,
      });
    } else {
      resp = await client.conversations.inviteShared({
        channel: selectedChannel,
        user_ids: userID,
        external_limited: isExternalLimited,
      });
    }

    if (datePicked) {
      await model.Invite.findByIdAndUpdate(
        resp.invite_id,
        { exp_date: datePicked },
        { upsert: true },
      );
    }

    const homeBlocks = await homeView.homeBlocks(body.user.id);

    await client.views.publish({
      user_id: body.user.id,
      view: {
        type: 'home',
        blocks: homeBlocks,
        external_id: 'homeView',
      },
    });

    return;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { inviteSubmittedCallback };
