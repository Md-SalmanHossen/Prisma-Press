import { prisma } from "../../lib/prisma";
import type { ICreatePostPayload, IUpdatePostPayload } from "./post.interface";

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

const updatePostInDB=async(postId:string,payload:IUpdatePostPayload,authorId:string,isAdmin:boolean)=>{
   const post=await prisma.post.findUniqueOrThrow({
      where:{
         id:postId
      }
   });

   if(!isAdmin && post.authorId!==authorId){
      throw new Error("You are not the owner this post");
   }

   const result=await prisma.post.update({
      where:{
         id:postId
      },
      data:payload,
      include:{
         author:{
            omit:{
               password:true
            }
         },
         comments:true
      }
   });

   return result;
}

const deletePostInDB=async(postId:string,authorId:string,isAdmin:boolean)=>{
   const post =await prisma.post.findFirstOrThrow({
      where:{
         id:postId
      }
   });

   if(!isAdmin && post.authorId!==authorId){
      throw new Error("You are not the owner of this post!");
   };

   const result = await prisma.post.delete({
      where:{
         id:postId
      }
   });

   return null;
}

export const postService={
   createPostInDB,
   getAllPostInDB,
   postByIdInDB,
   getMyPostInDB,
   updatePostInDB,
   deletePostInDB
}