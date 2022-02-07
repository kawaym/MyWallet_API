import db from "../../db.js";
import validateToken from "../middlewares/validateToken.js";
import dayjs from "dayjs";

export async function getTransaction(req, res) {
  try {
    const transactionsCollection = db.collection("transactions");

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      return res.sendStatus(401);
    }

    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }
    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) {
      return res.sendStatus(401);
    }

    const transactions = await transactionsCollection
      .find({ owner: user._id })
      .toArray();

    let extract = 0;
    for (let i in transactions) {
      console.log(typeof parseFloat(transactions[i].value));
      if (transactions[i].value !== undefined) {
        if (transactions[i].type === "entrada") {
          extract += parseFloat(transactions[i].value);
        } else {
          extract -= parseFloat(transactions[i].value);
        }
      }
    }

    res.send({
      owner: user.name,
      transactions: transactions,
      extract: extract.toFixed(2),
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createTransaction(req, res) {
  try {
    const transactionCollection = db.collection("transactions");

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      return res.sendStatus(401);
    }

    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }
    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) {
      return res.sendStatus(401);
    }

    const { name, description, value, type } = req.body;

    await transactionCollection.insertOne({
      name,
      description,
      value,
      owner: user._id,
      type,
      date: dayjs().format("DD/MM"),
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
