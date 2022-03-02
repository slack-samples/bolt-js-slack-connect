const homeView = require('./home_view');
const addFile = require('../../utils/add_file');

const uploadFileCallback = async ({ ack, view, body, client }) => {
  try {
    await ack();

    const userID = body.user.id;
    const inviteID = body.view.private_metadata;
    const providedValues = view.state.values;
    const fileURL = providedValues.uploadFileURL.upload_action.value;

    // call remote files upload API
    await client.files.remote.add({
      external_id: 'test123',
      title: 'testTitle',
      external_url: fileURL,
    });

    const homeblocks = await homeView.homeBlocks();

    const inviteBlocks = await addFile(inviteID, fileURL, client, userID);
    console.log(inviteBlocks);
    // concat the old blocks (i.e. home blocks) with the invite blocks
    const newBlocks = await homeblocks.concat(inviteBlocks);

    const result = await client.views.publish({
      user_id: userID,
      view: {
        type: 'home',
        blocks: newBlocks,
        private_metadata: userID,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
  }
  return 0;
};

module.exports = { uploadFileCallback };
