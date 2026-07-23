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

const postByIdInDB=async(postId:string)=>{
   const post=await prisma.post.findUniqueOrThrow({
      where:{
         id:postId
      }
   });

   const updatePost=await prisma.post.update({
      where:{
         id:postId,
      },
      data:{
         views:{
            increment:1
         }
      },
      include:{
         author:{
            omit:{
               password:true
            }
         },
         comments:true
      }
     
   })
   return updatePost;
}

const getMyPostInDB=async(authorId:string)=>{

   const result = await prisma.post.findMany({
      where:{
         authorId
      },
      orderBy:{
         createdAt:"desc"
      },
      include:{
         comments:true,
         author:{
            omit:{
               password:true
            }
         },
         _count:{
            select :{
               comments:true
            }
         }
      },
   });

   return result;
}



export const postService={
   createPostInDB,
   getAllPostInDB,
   postByIdInDB,
   getMyPostInDB
}