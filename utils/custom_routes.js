const html = require('../templates');

// Define custom routes one for the workspace install, one for the Org install
const customRoutes = [
  {
    // Only accessible for workspace Admins
    path: '/slack/install/workspace',
    method: ['GET'],
    handler: (req, res) => {
      res.writeHead(200);
      res.end(html.workspaceInstall);
    },
  },
  {
    // Only accesible for users which are Admins for an Enterprise Grid account
    path: '/slack/install/orgadmin',
    method: ['GET'],
    handler: (req, res) => {
      res.writeHead(200);
      res.end(html.orgAdminInstall);
    },
  },
];

module.exports = { customRoutes };
