import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import { Role } from "../../../generated/prisma/browser";
import { postController } from "./post.controller";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  postController.createPost,
);
router.get("/", postController.getAllPost);
router.get("/stats", auth(Role.ADMIN), postController.getPost);
router.get(
  "/my-posts",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  postController.getMyPost,
);
router.get("/:postId", postController.getPostById);
router.patch(
  "/:postId",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.updatePost,
);
router.delete(
  "/:id",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  postController.deletePost,
);

export default router;
