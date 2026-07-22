import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.utils";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse.utils";
import httpStatus from 'http-status';

const createPost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   const id = req.user?.id;
   const payload=req.body;

   const result =await postService.createPostInDB(payload,id as string);

   sendResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:"Post created successfully",
      data:{
         result
      }
   });
});


const getAllPost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   const allPost=await postService.getAllPostInDB();

   sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"Posts retrieved successfully",
      data:{
         allPost
      }
   });

});

const getPost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

});
const getMyPost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

});
const getPostById=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

});
const updatePost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

});
const deletePost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

});

export const postController = {
   createPost,
   getAllPost,
   getPost,
   getMyPost,
   getPostById,
   updatePost,
   deletePost
}