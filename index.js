import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import 'dotenv/config';
import mongoose from 'mongoose'
import Post from "./models/Post.js";

const uri = process.env.MONGO_DB_URI

const typeDefs = `#graphql
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  
  type Query {
    posts: [Post]
  }
`;

const resolvers = {
  Query: {
    posts: async () => {
      try {
        const posts = await Post.find()
        return posts;
      } catch(err) {
        throw new Error(err)
      }
    }
  },
};

const server = new ApolloServer({typeDefs, resolvers});


async function run() {
  try {
      await mongoose.connect(uri);
      console.log(
          "Pinged your deployment. You successfully connected to MongoDB!"
      ); 
  } catch (err) {
    console.log('err', err)
  }
}

run().catch(console.dir);

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
