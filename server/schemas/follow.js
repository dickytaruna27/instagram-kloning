const { ObjectId } = require("mongodb");
const { followUser } = require("../models/follow");

const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    input GenerateFollower {
        followingId: ID
    }

    type Mutation {
        addFollowing(input: GenerateFollower): Follow
    }
`;

const resolver = {
  Mutation: {
    addFollowing: async (_, args, context) => {
      const userLogin = await context.authentication();
      const { followingId } = args.input;

      const addFollow = await followUser({
        followingId: new ObjectId(followingId),
        followerId: new ObjectId(userLogin.userId),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return addFollow;
    },
  },
};

module.exports = { followTypeDefs: typeDefs, followResolver: resolver };
