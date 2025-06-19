import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

if (process.env.HTTPS_PROXY) {
  process.env.GLOBAL_AGENT_HTTP_PROXY = process.env.HTTPS_PROXY;
  await import('global-agent/bootstrap.js');
}

import transactionRoute from "./routes/transactionsRoute.js";
import authRoute from "./routes/authRoute.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

const PORT= process.env.PORT || 8080;

// middleware
app.use(rateLimiter);
app.use(express.json());



app.get("/", (req, res) => {
    res.send("its working");
});

app.use("/api/transactions", transactionRoute);
app.use("/api/auth", authRoute);



initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is up and running on PORT:", PORT);
    });
});
