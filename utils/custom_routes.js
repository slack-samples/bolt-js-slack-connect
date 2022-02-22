const html = require('./../templates');

const customRoutes = [
  {
    path: '/slack/install/workspace',
    method: ['GET'],
    handler: (req, res) => {
      res.writeHead(200);
      res.end(html.workspaceInstall);
    },
  },
  {
    path: '/slack/install/orgadmin',
    method: ['GET'],
    handler: (req, res) => {
      res.writeHead(200);
      res.end(html.orgAdminInstall);
    },
  },
];

module.exports = {customRoutes};
