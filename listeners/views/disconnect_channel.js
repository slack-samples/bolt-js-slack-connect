const model = require('../../database/db_model');

const disconnectChannelCallback = async ({ ack, view, body, client }) => {
  await ack({
    response_action: 'clear',
  });
  const providedValues = view.state.values;
  const channel = providedValues.channel_select_block.channels_select_actionID
    .selected_channel;

  const user = await model.User.find({ isEnterpriseInstall: true });

  let userToken;
  for (let i = 0; i < user.length; i += 1) {
    if (user[i].user.id === body.user.id) {
      userToken = user[i].user.token;
    }
  }

  try {
    const disconnectResp = await client.admin.conversations.disconnectShared({
      token: userToken,
      channel_id: channel,
    });
    return disconnectResp;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { disconnectChannelCallback };
