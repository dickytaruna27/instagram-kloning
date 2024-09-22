import { gql } from "@apollo/client";

export const DO_LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      access_token
    }
  }
`;

export const DO_Register = gql`
  mutation Mutation(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      _id
      name
      username
      email
    }
  }
`;

export const Read_Post = gql`
  query Query {
    readPost {
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        _id
        name
        username
        email
      }
    }
  }
`;

export const Add_Post = gql`
  mutation Mutation($input: CreatePostInput) {
    addPost(input: $input) {
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        _id
        name
        username
        email
      }
    }
  }
`;

export const My_Profile = gql`
  query Query {
    FindMyProfile {
      _id
      name
      username
      email
    }
  }
`;

export const SearchUserByuserame = gql`
  query SearchUserByUsername($username: String) {
    searchUserByUsername(username: $username) {
      _id
      name
      username
      email
    }
  }
`;

export const Add_Like = gql`
  mutation Mutation($input: CreateLike) {
    addLike(input: $input) {
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        _id
        name
        username
        email
      }
    }
  }
`;

export const Add_Comment = gql`
  mutation Mutation($input: CreateComment) {
    addComment(input: $input) {
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        _id
        name
        username
        email
      }
    }
  }
`;
