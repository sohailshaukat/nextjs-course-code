import { MongoClient } from "mongodb";

async function connectDatabase() {
    const client = await MongoClient.connect("mongodb+srv://admin-baba:<password>@cluster0.oosms.mongodb.net/events?retryWrites=true&w=majority");
    return client;
}

async function inserDocument(client, document){
    const db = client.db();
    await db.collection('emails').insertOne(document);
}

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;
    try {
        client = await connectDatabase();    
    } catch (error) {
        res.status(500).json({message: "Connecting to the database failed."});
        return;
    }
    try {
        await inserDocument(client, {email: userEmail});    
        client.close();
    } catch (error) {
        res.status(500).json({message:"Inserting data failed."});
    }
    

    

    console.log(userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;


