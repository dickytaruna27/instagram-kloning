const { ObjectId } = require("mongodb");
const { getDb } = require("../config/connection");

const UserDatabase = () => {
  return getDb().collection("Users");
};

const findAll = async () => {
  const users = await UserDatabase().find().toArray();
  return users;
};

const findUserById = async (id) => {
  const user = await UserDatabase().findOne({ _id: new ObjectId(id) });
  return user;
};

const findUsername = async (username) => {
  const user = await UserDatabase().findOne({
    username: { $regex: username, $options: "i" },
  });
  console.log(user);
  return user;
};

const register = async (payload) => {
  const newUser = await UserDatabase().insertOne(payload);
  const dataUser = await UserDatabase().findOne({
    _id: new ObjectId(newUser.insertedId),
  });

  return dataUser;
};

const findEmail = async (email) => {
  const user = await UserDatabase().findOne({ email });
  return user;
};

const FindMyProfile = async (id) => {
  const agg = [
    {
      $lookup: {
        from: "Follow",
        localField: "_id",
        foreignField: "followingId",
        as: "follower",
      },
    },
    {
      $lookup: {
        from: "Follow",
        localField: "_id",
        foreignField: "followerId",
        as: "following",
      },
    },
    {
      $lookup: {
        from: "Users",
        localField: "following.followingId",
        foreignField: "_id",
        as: "following",
      },
    },
    {
      $lookup: {
        from: "Users",
        localField: "follower.followerId",
        foreignField: "_id",
        as: "follower",
      },
    },
    {
      $project: {
        "follower.password": 0,
        "following.password": 0,
      },
    },
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
  ];
  const user = await UserDatabase().aggregate(agg).toArray();

  return user[0];
};

const findByPk = async (id) => {
  const agg = [
    {
      $lookup: {
        from: "Follow",
        localField: "_id",
        foreignField: "followingId",
        as: "follower",
      },
    },
    {
      $lookup: {
        from: "Follow",
        localField: "_id",
        foreignField: "followerId",
        as: "following",
      },
    },
    {
      $lookup: {
        from: "User",
        localField: "following.followingId",
        foreignField: "_id",
        as: "following",
      },
    },
    {
      $lookup: {
        from: "User",
        localField: "follower.followerId",
        foreignField: "_id",
        as: "follower",
      },
    },
    {
      $project: {
        "follower.password": 0,
        "following.password": 0,
      },
    },
  ];
  const user = await UserDatabase().aggregate(agg).toArray();

  return user[0];
};

module.exports = {
  findAll,
  findUsername,
  register,
  findEmail,
  findUserById,
  FindMyProfile,
  findByPk,
};
