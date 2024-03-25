// import { ApolloServer } from 'apollo-server';
// import gql from 'graphql-tag'
// const { ApolloServer } = require('apollo-server')
// import gql from 'graphql-tag'
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

// const uri = 'mongodb+srv://whitepk86:CefM73F9kzH""%n@cluster0.xjpmyxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// const uri = "mongodb+srv://whitepk86:<password>@cluster0.xjpmyxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const uri = "mongodb+srv://whitepk86:JoeBiden354@cluster0.xjpmyxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = process.env.MONGO_DB_URI

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

// const resolvers = {
//     Query: {
//         sayHi: () => 'Hello World'
//     }
// }

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({typeDefs, resolvers});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
          "Pinged your deployment. You successfully connected to MongoDB!"
      ); 
  } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
  }
}

run().catch(console.dir);

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

// mongoose.coonnect

console.log(`🚀  Server ready at: ${url}`);
