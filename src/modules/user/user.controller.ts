import {type NextFunction, type Request,type Response} from "express";
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

const getProfile=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

   //const {accessToken}=req.cookies;
   //console.log("access token",accessToken);
   //console.log("User request :",req.user);

   // const verifyToken=jwtUtils.verifyToken(accessToken,config.jwt_access_secret);
   // console.log("verify token",verifyToken);

   // if(typeof verifyToken==="string"){
   //    throw new Error(verifyToken);
   // }

   const profile=await userService.getMyProfileFromDB(req.user?.id as string)

   sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"User profile retrieved successfully",
      data:{profile}
   });
   
});

const updateMyProfile=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   
   const userId=req.user?.id as string;
   const payload=req.body;

   const updatedProfile=await userService.updateMyProfileIntoDB(userId,payload);

   sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"User profile updated successfully",
      data:{
         updatedProfile
      }
   });

});

export const userController={
   createUser,
   getProfile,
   updateMyProfile
}