import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from 'mongoose'

import resolvers from './graphql/resolvers/index.js'
import typeDefs from './graphql/typeDefs.js'

const uri = process.env.MONGO_DB_URI

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

async function run() {
	try {
		await mongoose.connect(uri)
		console.log(
			'Pinged your deployment. You successfully connected to MongoDB!'
		)
	} catch (err) {
		console.log('err', err)
	}
}

run().catch(console.dir)

const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => ({
    req,
  }),
	listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
