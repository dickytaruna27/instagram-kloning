const { GraphQLError } = require("graphql");
const { verifyToken } = require("./jwt");
const { findUserById } = require("../models/User");

const authentication = async (req) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "Unauthenticated",
        http: { status: 401 },
      },
    });
  }

  const access_token = authorization.split(" ")[1];

  if (!access_token) {
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "Unauthenticated",
        http: { status: 401 },
      },
    });
  }

  const decodeToken = verifyToken(access_token);

  const user = await findUserById(decodeToken.id);

  if (!user) {
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "Unauthenticated",
        http: { status: 401 },
      },
    });
  }

  return {
    userId: user._id,
    username: user.username,
  };
};

module.exports = authentication;
