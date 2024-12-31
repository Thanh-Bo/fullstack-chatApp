import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import {app , server} from './lib/socket.js';
import cors from "cors";
import path from 'path';
dotenv.config()


const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(cookieParser());        
app.use(express.json({ limit: '10mb' })); // or any size you need
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
    origin : "http://localhost:3000",
    credentials : true,
}));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    })
}

server.listen(PORT, () => {
    console.log('Server is running on port : ' + PORT);
    connectDB();
});