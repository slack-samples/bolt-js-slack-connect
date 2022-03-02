const { listInvitesAction } = require('./list_invites');
const { acceptInvite } = require('./accept_invite');
const { submitSharedChannelInvite } = require('./submit_channel_invite');
const { disconnectChannel } = require('./disconnect_channel');
const { approveInvite } = require('./approve_invite');
const { denyInvite } = require('./deny_invite');
const { uploadFile } = require('./upload_file');

module.exports.register = (app) => {
  app.action('submit_invite_action', submitSharedChannelInvite);
  app.action('list_invites_action', listInvitesAction);
  app.action('accept_action', acceptInvite);
  app.action('disconnect_channel', disconnectChannel);
  app.action('approve_action', approveInvite);
  app.action('deny_action', denyInvite);
  app.action('upload_action', uploadFile);
  app.action('ignore_action', uploadFile);
};
