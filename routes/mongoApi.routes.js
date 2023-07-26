const mongoose = require('mongoose')
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Databases connected : " , 
        connect.connection.host ,
        connect.connection.host);
        
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
module.exports = connectDb ;


















// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://mohamadsamara:mohamadsamara@cluster0.pwdp4gm.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// import { MongoClient } from "mongodb";

// const connectionString = process.env.ATLAS_URI || "";

// const client = new MongoClient(connectionString);

// let conn;
// try {
//   conn = await client.connect();
// } catch(e) {
//   console.error(e);
// }

// let db = conn.db("sample_training");

// export default db;