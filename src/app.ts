import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express, type Request, type Response } from 'express';
import config from './config';
import { prisma } from './lib/prisma';

const app: Express = express();

app.use(cors({
   origin:config.app_url,
   credentials:true,
}))

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/",async(req:Request,res:Response)=>{
   const user=await prisma.user.findMany();
   console.log(user);
   res.send("Hello world");
});

export default app;