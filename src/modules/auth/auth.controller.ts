import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.utils";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse.utils";
import  httpStatus  from 'http-status';

const loginUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   const payload=req.body;

   const {accessToken,refreshToken}= await authService.loginUser(payload);

   res.cookie("accessToken",accessToken,{
      httpOnly:true,
      secure:false,
      sameSite:"none",
      maxAge: 1000*60*60*24
   });

   res.cookie("refreshToken",refreshToken,{
      httpOnly:true,
      secure:false,
      sameSite:"none",
      maxAge:1000*60*60*24*7
   });

   const loginResult= await authService.loginUser(payload);

   sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"User login successfully",
      data:loginResult,

   });
   
});

const refreshToken=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   
   const getRefreshToken= req.cookies.refreshToken;

   //console.log("1. req.cookies:", req.cookies);
   //console.log("2. getRefreshToken:", req.cookies.refreshToken);

   const {accessToken} = await authService.refreshTokenInDB(getRefreshToken);

   res.cookie("accessToken",accessToken,{
      httpOnly:true,
      secure:false,
      sameSite:"none",
      maxAge:1000*60*60*24
   });

   sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"Token refresh token successfully",
      data:{
         accessToken
      }
   })
});


export const authController={
   loginUser,
   refreshToken
}