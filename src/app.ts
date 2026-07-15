import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express, type Request, type Response } from 'express';
import config from './config';

const app: Express = express();

app.use(cors({
   origin:config.app_url,
   credentials:true,
}))

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/",(req:Request,res:Response)=>{
   res.send("Hello world");
});

export default app;