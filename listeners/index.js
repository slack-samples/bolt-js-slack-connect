const actions = require('./actions');
const events = require('./events');
const views = require('./views');

module.exports.registerListeners = (app) => {
  actions.register(app);
  events.register(app);
  views.register(app);
};