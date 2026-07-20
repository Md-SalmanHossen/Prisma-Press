import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import { jwtUtils } from "../utils/jwt.utils";
import type { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { prisma } from "../lib/prisma";
import type { Role } from "../../generated/prisma/enums";


declare global{
   namespace Express{
      interface Request{
         user?:{
            email:string;
            name:string;
            id:string;
            role:Role;
         }
      }
   }
}

export const auth = (...requiredRoles:Role[])=>{
   return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
      
      const token = req.cookies.accessToken ?
      req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer") ? 
      req.headers.authorization?.split(" ")[1] 
      : req.headers.authorization;

      if(!token){
         throw new Error("You are not logged in.Please log in to access this resource.")
      };

      const verifyToken=jwtUtils.verifyToken(token,config.jwt_access_secret);

      if(!verifyToken.success){
         throw new Error(verifyToken.error);
      }
      const {id,name,email,role}=verifyToken.data as JwtPayload;
      if(!requiredRoles.includes(role)){
         throw new Error("Forbidden. You don't have permission to access this resource");
      }

      const user = await prisma.user.findUnique({
         where:{
            id,
            email,
            name,
            role
         }
      });

      if(!user){
         throw new Error("User not found. Please log in again");
      }

      if(user.activeStatus==="BLOCKED"){
         throw new Error("Your account been blocked. Please contact support")
      }

      req.user={
         id,
         email,
         name,
         role
      }
      next();

   });
}