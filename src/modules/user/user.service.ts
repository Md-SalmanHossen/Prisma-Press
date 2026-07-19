import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import type { RegisterUserPayload } from "./user.interface";


const registerUserIntoDB =async(payload : RegisterUserPayload)=>{

   const {name,email,password,profilePhoto}=payload;

   const isUserExists= await prisma.user.findUnique({
      where:{email}
   });

   if(isUserExists){
      throw new Error("User with this email already exists");
   }

   const hashedPassword=await bcrypt.hash(password,Number(config.bcrypt_salt_rounds));

   const createdUser = await prisma.user.create({
      data:{
         name,
         email,
         password:hashedPassword,
         profile:{
            create:{
               profilePhoto:profilePhoto??null
            }
         }
      }
   });

   // await prisma.profile.create({
   //    data:{
   //       userId:createdUser .id,
   //       profilePhoto:profilePhoto??null
   //    }
   // });

   const user = await prisma.user.findUnique({
      where:{
         id:createdUser.id,
         email:createdUser.email ||email
      },
      omit:{
          password:true
      },
      include:{
         profile:true
      }
   });

   return user;
}

const getMyProfileFromDB=async(userId:string)=>{
   const user = await prisma.user.findUniqueOrThrow({
      where:{id:userId},
      omit:{
         password:true,
      },include:{
         profile:true
      }
   });
   return user;
}

export const userService={
  registerUserIntoDB, 
  getMyProfileFromDB
}