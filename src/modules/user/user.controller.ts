import {type NextFunction, type Request,type RequestHandler,type Response} from "express";
import httpStatus from 'http-status';
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync.utils";
import { sendResponse } from "../../utils/sendResponse.utils";


const createUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   const payload=req.body;
   
   const user =await userService.registerUserIntoDB(payload);

   sendResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:"User registered successfully",
      data:{user}
   })
});

export const userController={
   createUser,
}