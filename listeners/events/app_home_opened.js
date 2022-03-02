const homeView = require('../views/home_view');

const appHomeOpenedCallback = async ({ client, event }) => {
  if (event.tab !== 'home') return;

  const homeBlocks = await homeView.homeBlocks(event.user);
  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: 'home',
        blocks: homeBlocks,
        external_id: 'homeView',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { appHomeOpenedCallback };
