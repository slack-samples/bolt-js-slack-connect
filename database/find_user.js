const model = require('./db_model');

const findUser = async function(id) {
  try {
    const user = await model.User.find({_id: id});
    // return first user we find
    console.log(user)
    if (user[0] != undefined) {
      return user[0];
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  findUser,
};
