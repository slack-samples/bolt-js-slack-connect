const uri = `mongodb+srv://${process.env.DB_USERNAME}:${
  process.env.DB_PASSWORD
}@cluster0.yvswg.mongodb.net/${process.env.DB_NAME
}?retryWrites=true&w=majority`;

const mongoose = require('mongoose');

require('dotenv').config();

const connect = async function () {
  // Connect to MongoDB
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
};

module.exports = {
  connect,
};
