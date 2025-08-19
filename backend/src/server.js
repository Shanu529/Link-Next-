import express from "express";
import "dotenv/config";
import router from "./routers/authRouter.js";
import userRoute from './routers/userRoute.js'
import cookieParser from "cookie-parser"

import authUsers from './routers/userRoute.js';
import chatRoutes from './routers/chat.Route.js';

import cors from 'cors';
import connectDb from '../src/lib/db.js'
const app  = express()
const PORT = 4000;


app.use(cors({
    origin: "http://localhost:5173",
    Credential: true
}));
app.use(express.json());
app.use(cookieParser());



app.use("/api/auth",router);
app.use("/api/users",authUsers);
app.use("/api/chat",chatRoutes);

app.listen(PORT,()=>{  
    console.log(`server start port nnumber ${PORT}` )
    connectDb()
})

