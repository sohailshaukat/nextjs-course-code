import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;

  const data = req.body;
  const { newPassword, oldPassword } = data;

  const client = await connectToDatabase();
  const usersCollection = await client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    client.close();
    res.status(404).json({ message: "User not found!" });
    return;
  }

  const currentPassword = user.password;

  const isValid = await verifyPassword(oldPassword, currentPassword);
  if (!isValid) {
    client.close();
    res.status(403).json({
      message: "Invalid old password.",
    });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({message:"Password updated!"});
}

export default handler;
