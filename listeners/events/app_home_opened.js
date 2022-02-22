const homeView = require('../views/home_view.js');

const appHomeOpenedCallback = async ({client, event, body}) => {
  if (event.tab !== 'home') return;

  const homeBlocks = await homeView.homeBlocks(event.user);
  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        'type': 'home',
        'blocks': homeBlocks,
        'external_id': 'homeView',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {appHomeOpenedCallback};
