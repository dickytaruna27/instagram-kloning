const { ObjectId } = require("mongodb");
const { getDb } = require("../config/connection");

const PostDatabase = () => {
  return getDb().collection("Post");
};

const createPost = async (payload) => {
  console.log(payload);

  const newPost = await PostDatabase().insertOne(payload);
  const post = await PostDatabase().findOne({
    _id: new ObjectId(newPost.insertedId),
  });
  return post;
};

const findPost = async () => {
  const agg = [
    {
      $lookup: {
        from: "Users",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        "author.password": 0,
        "comments.createdAt": 0,
        "comments.updatedAt": 0,
        "likes.createdAt": 0,
        "likes.updatedAt": 0,
      },
    },
  ];
  const posts = await PostDatabase().aggregate(agg).toArray();

  // console.log(posts, "<<< posts");
  return posts;
};

const findPostById = async (id) => {
  const agg = [
    {
      $lookup: {
        from: "Users",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        "author.password": 0,
      },
    },
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
  ];

  const post = await PostDatabase().aggregate(agg).toArray();

  return post[0];
};

const addComment = async (postId, content, username) => {
  await PostDatabase().updateOne(
    { _id: new ObjectId(postId) },
    {
      $push: {
        comments: {
          content,
          username,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    }
  );

  const dataPost = await PostDatabase().findOne({
    _id: new ObjectId(postId),
  });
  // console.log(dataPost);
  return dataPost;
};

const addLike = async (postId, username) => {
  await PostDatabase().updateOne(
    { _id: new ObjectId(postId) },
    {
      $push: {
        likes: {
          username,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    }
  );
  const dataPost = await PostDatabase().findOne({
    _id: new ObjectId(postId),
  });

  return dataPost;
};
module.exports = { createPost, findPost, findPostById, addComment, addLike };
