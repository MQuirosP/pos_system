import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
}

export default corsOptions;