const model = require('./db_model');

const findUser = async (id) => {
  try {
    // Use MongoDB framework Mongoose to query our database for a particular user by either
    // Enterprise ID or Team ID.
    const user = await model.User.find({ _id: id });
    // Return first user we find.
    if (user[0] !== undefined) {
      return user[0];
    }
  } catch (error) {
    console.error(error);
  }
  return false;
};

module.exports = {
  findUser,
};
