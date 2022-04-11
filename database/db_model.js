const mongoose = require('mongoose');

require('dotenv').config();

const usersSchema = mongoose.Schema(
  {
    _id: String,
    team: { id: String, name: String },
    enterprise: { id: String, name: String },
    user: { token: String, scopes: [String], id: String },
    tokenType: String,
    isEnterpriseInstall: Boolean,
    appId: String,
    authVersion: String,
    bot: {
      scopes: [
        String,
      ],
      token: String,
      userId: String,
      id: String,
    },
  },
  { _id: false },
);

const inviteSchema = mongoose.Schema(
  {
    _id: String,
    invite: {
      id: String,
      inviting_team: { id: String, name: String },
      inviting_user: { id: String, team_id: String, name: String },
      link: String,
      recepient_email: String,
    },
    channel: { id: String, is_private: Boolean, is_im: Boolean, name: String },
    acceptances: [{
      approval_status: String,
      accepting_team: { id: String, name: String },
      accepting_user: { id: String, team_id: String, name: String },
    }],
    reviews: [{ type: String, reviewing_team: { id: String, name: String } }],
    exp_date: String,
    isIgnored: Boolean,
    externalFileURL: String,
  },
  { _id: false },
);

const User = mongoose.model('User', usersSchema);
const Invite = mongoose.model('Invite', inviteSchema);

module.exports = {
  User,
  Invite,
};
