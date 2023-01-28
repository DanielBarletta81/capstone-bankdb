import { MongoClient } from "mongodb";

export async function createOne() {

const uri =
    "mongodb+srv://House-Doctor8181:Forgotpasswords1981@goodbankv-2.vb5hih9.mongodb.net/GoodBank?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


    try {
        await client.connect();
        // database and collection code goes here
        const db = client.db("GoodBank");
        const coll = db.collection("users");
        const doc = {
            name: "Danny",
            email: "Danny@ocean.com",
            password: "passwordz",
            balance:19919
}
        // find code goes here
        const cursor = coll.insertOne(doc);

        // iterate code goes here
        await cursor.forEach(console.log);

         } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
createOne().catch(console.dir);
