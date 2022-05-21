const { listInvitesAction } = require('./list_invites');
const { submitSharedChannelInvite } = require('./submit_channel_invite');
const { disconnectChannel } = require('./disconnect_channel');
const { approveInvite } = require('./approve_invite');
const { denyInvite } = require('./deny_invite');

module.exports.register = (app) => {
  app.action('submit_invite_action', submitSharedChannelInvite);
  app.action('list_invites_action', listInvitesAction);
  app.action('disconnect_channel', disconnectChannel);
  app.action('approve_action', approveInvite);
  app.action('deny_action', denyInvite);
};
