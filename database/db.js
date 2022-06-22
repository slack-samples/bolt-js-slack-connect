const uri = `mongodb+srv://${process.env.DB_USERNAME}:`
+ `${process.env.DB_PASSWORD}@${process.env.CLUSTER}.mongodb.net/`
+ `${process.env.DB_NAME}?retryWrites=true&w=majority`;

const mongoose = require('mongoose');

require('dotenv').config();

const connect = async () => {
  // Connect to MongoDB instance. Need DB Name to be able to connect to MongoDB.
  // You will need to have a free MongoDB account to run this sample.
  try {
    mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    return;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  connect,
};
