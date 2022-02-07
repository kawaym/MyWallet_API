import db from "../../db.js";


export default async function validateToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
      return res.sendStatus(401)
    }

    const session = await db.collection('sessions').findOne({ token });
    if (!session) {
      return res.sendStatus(401)
    }

    const user = await db.collection('users').findOne({ _id: session.userId });
    if (!user) {
      return res.sendStatus(401);
    }

    res.locals.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

