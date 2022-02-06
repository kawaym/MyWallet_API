import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../../db.js";

export async function signIn(req, res) {
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });
  console.log(user);

  if (user) {
    const token = uuid();

    console.log(user);

    await db.collection("sessions").insertOne({ token, userId: user._id });
    res.send(token);
  } else {
    res.sendStatus(401);
  }
}
