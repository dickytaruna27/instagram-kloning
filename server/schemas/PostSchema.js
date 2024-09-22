const {
  createPost,
  findPost,
  findPostById,
  addComment,
  addLike,
} = require("../models/posts");
const redis = require("../config/redis");

const typeDefs = `#graphql
type Post {
  content: String
  tags: [String]
  imgUrl: String
  authorId: String
  comments: [Comment]
  likes: [Likes]
  createdAt: String
  updatedAt: String
  author: User
}

type Comment{
  content: String
  username: String
  createdAt: String
  updatedAt: String
  }

  type Likes{
    username: String
    createdAt: String
    updatedAt: String
  }
  input CreatePostInput {
    content: String!
    tags: [String!]
    imgUrl: String!
  }
  input CreateComment{
  postId: ID
  content: String!
  }
  input CreateLike{
  postId: ID
  }

type Query {
  readPost: [Post]
  findPostById(_id: ID): Post
}

type Mutation {
  addPost(input: CreatePostInput): Post
  addComment(input: CreateComment): Post
  addLike(input: CreateLike): Post
}
`;

const resolvers = {
  Query: {
    readPost: async (_, args, context) => {
      const userLogin = await context.authentication();
      const cache = JSON.parse(await redis.get("diki"));
      // console.log("oke");
      // console.log(cache, "<<<<<<");
      if (!cache) {
        const post = await findPost();
        console.log(post);
        await redis.set("diki", JSON.stringify(post));
        return post;
      }
      return cache;
    },
    findPostById: async (_, args, context) => {
      const { _id } = args;
      const userLogin = await context.authentication();
      const cache = JSON.parse(await redis.get("data"));
      // console.log(cache);

      if (!cache) {
        const post = await findPostById(_id);
        redis.set("data", JSON.stringify(post));
        return post;
      }

      return cache;
    },
  },

  Mutation: {
    addPost: async (_, args, context) => {
      const userLogin = await context.authentication();

      const { content, tags, imgUrl } = args.input;

      const dataPost = await createPost({
        content,
        tags,
        imgUrl,
        authorId: userLogin.userId,
        comments: [],
        likes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // console.log(dataPost);
      redis.del("diki");
      return dataPost;
    },
    addComment: async (_, args, context) => {
      const userLogin = await context.authentication();

      const { postId, content } = args.input;

      const dataPost = await addComment(postId, content, userLogin.username);
      // console.log(dataPost);
      return dataPost;
    },
    addLike: async (_, args, context) => {
      const userLogin = await context.authentication();
      const { postId } = args.input;

      const dataPost = await addLike(postId, userLogin.username);
      return dataPost;
    },
  },
};

module.exports = { resolvers, typeDefs };
