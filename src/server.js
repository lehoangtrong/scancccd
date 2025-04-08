import cors from "cors";
import express from "express";
import initWebRoutes from "./routes/v1/index.js";
require("dotenv").config();

const app = express();
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

initWebRoutes(app);

app.listen(port, () => {
    console.log(`=================================`);
    console.log(`======= SERVER STARTED =========`);
    console.log(`=================================`);
    console.log(`Server is running on ${host}:${port}`);
    console.log(`=================================`);
});

export default app;