import { Db, MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://admin-baba:Test123@cluster0.oosms.mongodb.net/events?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    // add server-side validation
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    } else {
      const newComment = {
        email,
        name,
        text,
        eventId,
      };
      console.log(newComment);
      const db = client.db();

      const result = await db.collection("comments").insertOne(newComment);

      console.log(result);
      newComment.id = result.insertedId;
      res.status(200).json({ message: "Added comment.", comment: newComment });
    }
  } else if (req.method === "GET") {
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
