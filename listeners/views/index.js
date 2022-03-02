const { homeViewCallback } = require('./home_view');
const { inviteUserViewCallback } = require('./invite_user_modal');
const { inviteSubmittedCallback } = require('./invite_submitted');
const { disconnectChannelCallback } = require('./disconnect_channel');
const { uploadFileCallback } = require('./upload_file');

module.exports.register = (app) => {
  app.view('home_view', homeViewCallback);
  app.view('inviteUserView', inviteUserViewCallback);
  app.view('inviteSubmitted', inviteSubmittedCallback);
  app.view('disconnect', disconnectChannelCallback);
  app.view('uploadFileCallback', uploadFileCallback);
};
