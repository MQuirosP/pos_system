import { globalErrorHandler } from './../middlewares/errorHandler.middleware';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { responseMiddleware } from "@middlewares/response.middleware";
import routes from "@routes/index";
import requestLogger from "@middlewares/requestLogger.middleware";
import logger from "@utils/logger";

const app = express();

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
}));
app.use(express.json({
    limit: "10mb",
    strict: true,
    type: "application/json"
}));

app.use(requestLogger(logger))
app.use(responseMiddleware);

app.use("/api", routes);

app.use(globalErrorHandler);

export default app;