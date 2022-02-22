const {listInvites} = require('./list_invites.js');
const {acceptInvite} = require('./accept_invite.js');
const {submitSharedChannelInvite} = require('./submit_channel_invite.js');
const {disconnectChannel} = require('./disconnect_channel.js');
const {approveInvite} = require('./approve_invite.js');
const {denyInvite} = require('./deny_invite.js');
const {uploadFile} = require('./upload_file.js');

module.exports.register = (app) => {
  app.action('submit_invite_action', submitSharedChannelInvite);
  app.action('list_invites_action', listInvites);
  app.action('accept_action', acceptInvite);
  app.action('disconnect_channel', disconnectChannel);
  app.action('approve_action', approveInvite);
  app.action('deny_action', denyInvite);
  app.action('upload_action', uploadFile);
  app.action('ignore_action', uploadFile);
};
