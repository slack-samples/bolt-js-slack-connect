// Register all of our events by the event callback and file name
const { appHomeOpenedCallback } = require('./app_home_opened');
const { sharedChannelInviteAccepted } = require('./sc_invite_accepted');
const { sharedChannelInviteApproved } = require('./sc_invite_approved');
const { sharedChannelInviteDeclined } = require('./sc_invite_declined');
const { sharedChannelInviteReceived } = require('./sc_invite_received');

module.exports.register = (app) => {
  app.event('app_home_opened', appHomeOpenedCallback);
  app.event('shared_channel_invite_accepted', sharedChannelInviteAccepted);
  app.event('shared_channel_invite_approved', sharedChannelInviteApproved);
  app.event('shared_channel_invite_declined', sharedChannelInviteDeclined);
  app.event('shared_channel_invite_received', sharedChannelInviteReceived);
};
