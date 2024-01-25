import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { connectDb } from "./src/config/DB.config.js";
import UserRouter from "./src/routes/UserRoute.js";
const app = express();
connectDb()
app.use(express.json())
app.use("/api/user", UserRouter)
const PORT = process.env.PORT || 4000 
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})