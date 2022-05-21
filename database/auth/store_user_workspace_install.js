const model = require('../db_model');

const saveUserWorkspaceInstall = async (installation) => {
  try {
    // Use MongoDB framework Mongoose to update our Database with workspace credentials.
    const resp = await model.User.updateOne(
      { _id: installation.team.id },
      {
        team: { id: installation.team.id, name: installation.team.name },
        // Entperise ID is null on workspace install.
        enterprise: { id: 'null', name: 'null' },
        // User scopes and user token is null on workspace install.
        user: { token: 'null', scopes: 'null', id: installation.user.id },
        tokenType: installation.tokenType,
        isEnterpriseInstall: installation.isEnterpriseInstall,
        appId: installation.appId,
        authVersion: installation.authVersion,
        bot: {
          scopes: installation.bot.scopes,
          token: installation.bot.token,
          userId: installation.bot.userId,
          id: installation.bot.id,
        },
      },
      { upsert: true },
    );
    return resp;
  } catch (error) {
    console.error(error);
    return error;
  }
};
module.exports = { saveUserWorkspaceInstall };
