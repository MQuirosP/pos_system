import app from "./app"
import dataSource from '@config/ormconfig';

const PORT = process.env.PORT || 3000;

dataSource.initialize().then(() => {
    console.log("Database connection estalished successfully!");

    app.listen(PORT, () => {
        console.log(`Server running at PORT: ${PORT}`);
    });
})
.catch((error) => {
    console.error("Error connecting to the database.", error)
});