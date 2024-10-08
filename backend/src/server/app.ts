import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { responseMiddleware } from "@middlewares/responseMiddleware";
import routes from "@routes/index";

const app = express();

app.use(cors());
app.use(bodyParser.json({
    limit: "10mb",
    strict: true,
    type: "application/json"
}));

app.use(responseMiddleware);
app.use("/api/", routes);

export default app;