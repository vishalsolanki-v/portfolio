import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URL
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env")
}

client = new MongoClient(uri!)
clientPromise = client.connect()

export default clientPromise
