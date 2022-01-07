import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import BaseRouter from "./router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// Add APIs
app.use("/", BaseRouter);

// Export express instance
export default app;
