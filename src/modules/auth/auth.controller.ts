import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.utils";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse.utils";
import  httpStatus  from 'http-status';

const loginUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   const payload=req.body;

   const loginResult= await authService.loginUser(payload);

   sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"User login successfully",
      data:loginResult,

   });
   
});

export const authController={
   loginUser,
}