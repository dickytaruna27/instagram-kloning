const {
  register,
  findAll,
  findUsername,
  findEmail,
  FindMyProfile,
  findByPk,
} = require("../models/User");
const { hash, compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { GraphQLError } = require("graphql");

const typeDefsUser = `#graphql
type User {
  _id: ID
  name: String
  username: String
  email: String
}

type ResponseLogin {
  username: String
  access_token: String
}

type Query {
  user:[User]
  searchUserByUsername(username: String): User
  FindMyProfile: User
  findUserByPk(_id: ID): User
}

type Mutation{
  register(name: String!, username: String!, email: String!, password: String!): User
  login(username: String!, password: String!): ResponseLogin

}

`;

const resolverUser = {
  Query: {
    user: async () => {
      const users = await findAll();
      return users;
    },
    searchUserByUsername: async (_, args) => {
      const { username } = args;
      // console.log(args, "<<<<<<");
      const users = await findUsername(username);
      return users;
    },
    FindMyProfile: async (_parent, args, contextValue) => {
      const profile = await contextValue.authentication();
      const findProfile = await FindMyProfile(profile.userId);
      // console.log(profile);

      return findProfile;
    },
    findUserByPk: async (_, args) => {
      const { _id } = args;
      // console.log(args, "<<<<");

      const users = await findByPk(_id);
      // console.log(users);
      return users;
    },
  },

  Mutation: {
    register: async (_, args) => {
      const { name, username, email, password } = args;

      const checkEmail = await findEmail(email);
      const checkUsername = await findUsername(username);

      if (checkEmail) {
        throw new GraphQLError("Email already exists", {
          extensions: {
            code: "Unique",
            http: { status: 400 },
          },
        });
      }

      if (checkUsername) {
        throw new GraphQLError("username already exists", {
          extensions: {
            code: "Unique",
            http: { status: 400 },
          },
        });
      }

      if (password.length < 5) {
        throw new GraphQLError("password minimum 5 length", {
          extensions: {
            code: "Bad Request",
            http: { status: 400 },
          },
        });
      }

      const newUser = await register({
        name,
        username,
        email,
        password: hash(password),
      });

      return newUser;
    },

    login: async (_, args) => {
      const { username, password } = args;
      const user = await findUsername(username);

      if (!user) {
        throw new GraphQLError("Invalid username", {
          extensions: {
            code: "Unauthenticated",
            http: { status: 401 },
          },
        });
      }

      const validPassword = compare(password, user.password);

      if (!validPassword) {
        throw new GraphQLError("Invalid password", {
          extensions: {
            code: "Unauthenticated",
            http: { status: 401 },
          },
        });
      }
      const payload = {
        id: user._id,
        username: user.username,
      };
      console.log(payload);

      const access_token = signToken(payload);

      return {
        username: user.username,
        access_token,
      };
    },
  },
};

module.exports = { typeDefsUser, resolverUser };
