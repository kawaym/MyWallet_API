import express, { json } from "express";
import cors from "cors";
import router from "./src/routes/router.js";

const app = express();
app.use(cors());
app.use(json());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log("Listening on port" + process.env.PORT);
});