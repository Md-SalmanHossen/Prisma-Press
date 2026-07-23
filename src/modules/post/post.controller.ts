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

const getPostById=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   const postId=req.params.postId;
   if(!postId){
      throw new Error("Post id required in params");
   }

   const result = await postService.postByIdInDB(postId as string);

   sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"Post retrieved successfully",
      data:{
         result
      }
   });
});

const getMyPost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const authorId=req.user?.id;
    const result = await postService.getMyPostInDB(authorId as string);
    sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"My Post retrieved successfully",
      data:{
         result
      }
   });
});

const getPost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

});

const updatePost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   const authorId=req.user?.id;
   const isAdmin=req.user?.role==="ADMIN";

   const postId=req.params.postId;
   const payload=req.body;

   if(!postId){
      throw new Error("Post id required in params")
   }

   const result=await postService.updatePostInDB(postId as string,payload,authorId as string,isAdmin);
   sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"Post updated successfully",
      data:{
         result
      }
   });

});

const deletePost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   const authorId=req.user?.id;
   const isAdmin=req.user?.role==="ADMIN";

   const postId=req.params.id;
   if(!postId){
      throw new Error("Post id required in params")
   }

   await postService.deletePostInDB(postId as string,authorId as string,isAdmin);
   
   sendResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"Post deleted successfully",
      data:null
   });
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