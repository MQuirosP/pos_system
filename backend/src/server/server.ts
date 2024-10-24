import dotenv from 'dotenv';
import app from "./app"
import dataSource from '@config/ormconfig';
import { globalErrorHandler } from "@middlewares/errorHandler";

dotenv.config();

const PORT = process.env.PORT || 3000;

dataSource.initialize().then(() => {
    console.log("Connected to the database!");

    app.use(globalErrorHandler);

    app.listen(PORT, () => {
        console.log(`Server running at PORT: ${PORT}`);
    });
})
.catch((error) => {
    console.error("Error connecting to the database.", error)
});