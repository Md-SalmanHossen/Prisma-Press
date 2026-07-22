import { prisma } from "../../lib/prisma";
import type { ICreatePostPayload } from "./post.interface";

const createPostInDB=async(payload:ICreatePostPayload,userId:string)=>{
   const result=await prisma.post.create({
      data:{
         ...payload,
         authorId:userId
      }
   });

   return result;
}

const getAllPostInDB=async()=>{
   const posts=await prisma.post.findMany({
      include:{
         author:{
            omit:{
               password : true
            }
         },
         comments:true
      }
   });
   return posts;
}

export const postService={
   createPostInDB,
   getAllPostInDB
}