import dotenv from "dotenv";
dotenv.config();

import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";


const app=express();
const __dirname=path.resolve();
console.log(" MONGO_URI:", process.env.MONGO_URI);
connectDB();

console.log("Redis URL:", process.env.UPSTASH_REDIS_REST_URL);
console.log("Redis Token:", process.env.UPSTASH_REDIS_REST_TOKEN);


//middleware
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173", 
})); 
//app.use(rateLimiter);
app.use("/api/notes",notesRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// app.get("api/notes",(req,res)=>{
//     res.status(200).send({message:"Note created successfully!"});
// })

app.listen(5001,()=>{
    console.log("Server started on PORT: 5001");
});

//mongodb+srv://adithyamanthena04:Vd9AM8syJffkdFi5@cluster0.dypzbeo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0