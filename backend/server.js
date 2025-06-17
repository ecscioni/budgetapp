import express from "express"
import dotenv from "dotenv"
import {initDB} from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"

import transactionRoute from "./routes/transactionsRoute.js"
import goalsRoute from "./routes/goalsRoute.js"

dotenv.config();

const app = express();

const PORT= process.env.PORT || 5001;

// middleware
app.use(rateLimiter);
app.use(express.json());



app.get("/", (req, res) => {
    res.send("its working");
});

app.use("/api/transactions", transactionRoute);
app.use("/api/goals", goalsRoute);



initDB(initDB).then(() => {
    app.listen(PORT, () => {
        console.log("Server is up and running on PORT:", PORT);
    });
});
