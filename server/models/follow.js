const { ObjectId } = require("mongodb");
const { getDb } = require("../config/connection");

const followDatabase = () => {
  return getDb().collection("Follow");
};

const findAllFollower = async () => {
  const follow = await followDatabase().find().toArray();
  return follow;
};

const followUser = async (payload) => {
  const following = await followDatabase().insertOne(payload);

  const dataFollow = await followDatabase().findOne({
    _id: new ObjectId(following.insertedId),
  });

  return dataFollow;
};

module.exports = {
  findAllFollower,
  followUser,
};
