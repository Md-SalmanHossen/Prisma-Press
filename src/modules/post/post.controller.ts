import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.utils";

const createPost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

});
const getAllPost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

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