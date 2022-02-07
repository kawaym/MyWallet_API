import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../../db.js";
import dayjs from "dayjs";

export async function signIn(req, res) {
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = uuid();

    console.log('criado');

    await db.collection("sessions").insertOne({ token, userId: user._id });
    res.send({ "token" : token }).status(201);
  } else {
    res.sendStatus(401);
  }
}

export async function signUp(req, res) {
  const  {email, name, password} = req.body;

  const user = await db.collection("users").findOne({email});

  const encryptedPass = bcrypt.hashSync(password, 10);

  if(!user){
    console.log('criado');
    await db.collection("users").insertOne({email, name, password: encryptedPass, createdOn: dayjs().format("MM-DD-YYYY")})
    res.sendStatus(201);
  }
  else{
    res.sendStatus(418);
  }
}