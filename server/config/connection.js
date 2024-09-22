require("dotenv").config();

const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  try {
    client.db(process.env.MONGODB_NAME);
  } catch (error) {
    await client.close();
  }
}

const getDb = () => {
  return client.db(process.env.MONGODB_NAME);
};

module.exports = { connect, getDb };
