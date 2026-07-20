
import {Router, type NextFunction, type Request, type Response} from "express";
import { userController } from "./user.controller";
import { Role } from "../../../generated/prisma/client";
import { auth } from "../../middlewares/auth.middleware";

const router = Router();


router.post("/register",userController.createUser);

router.get("/me",auth(Role.ADMIN,Role.USER,Role.AUTHOR),userController.getProfile)

router.put("/me-profile",auth(Role.ADMIN,Role.USER,Role.AUTHOR),userController.updateMyProfile)
export default router;

