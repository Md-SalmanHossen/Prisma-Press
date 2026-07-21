import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import type { ILoginUser } from "./auth.interface";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt.utils";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findFirstOrThrow({
    where: { email },
  });

  if(user.activeStatus==="BLOCKED"){
      throw new Error("Your account been blocked. Please contact support")
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken =jwtUtils.createToken(
      jwtPayload,
      config.jwt_access_secret,
      config.jwt_access_expires_in as SignOptions
  )

  const refreshToken = jwtUtils.createToken(
      jwtPayload,
      config.jwt_refresh_secret,
      config.jwt_refresh_expires_in as SignOptions
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshTokenInDB=async(refreshToken:string)=>{
  if (!refreshToken) {
    throw new Error("Refresh token is missing from cookies!");
  }
  //console.log("3. Refresh Secret being used:", config.jwt_refresh_secret);
  const verifiedRefreshToken=jwtUtils.verifyToken(refreshToken,config.jwt_refresh_secret);
  //console.log("4. Verified Result:", verifiedRefreshToken);

  if(!verifiedRefreshToken.success){
    throw new Error(verifiedRefreshToken.error);
  }

  const {id}=verifiedRefreshToken.data as JwtPayload;

  const user = await prisma.user.findFirstOrThrow({
    where:{
      id
    }
  })
  if(user.activeStatus==="BLOCKED"){
    throw new Error("User is blocked!");
  }

  const jwtPayload={
    id,
    name:user.name,
    email:user.email,
    role:user.role
  }

  const accessToken=jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
  );

  return {accessToken}
}

export const authService = {
  loginUser,
  refreshTokenInDB
};
