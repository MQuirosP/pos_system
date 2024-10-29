import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { responseMiddleware } from "@middlewares/responseMiddleware";
import routes from "@routes/index";
import requestLogger from "@middlewares/requestLogger";
import logger from "@utils/logger";

const app = express();

app.use(cors());
app.use(bodyParser.json({
    limit: "10mb",
    strict: true,
    type: "application/json"
}));

app.use(requestLogger(logger))
app.use(responseMiddleware);

app.use("/api", routes);

export default app;