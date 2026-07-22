
import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware';
import { Role } from '../../../generated/prisma/browser';
import { commentController } from './comment.controller';

const router=Router();

 
router.post("/",auth(Role.ADMIN,Role.AUTHOR,Role.USER),commentController.createComment);
router.get("/author/:authorId",commentController.getCommentByAuthorId)
router.get("/commentId",commentController.getCommentById)
router.patch("/:commentId",auth(Role.ADMIN,Role.AUTHOR,Role.USER),commentController.updateComment);
router.delete("/:commentId",auth(Role.ADMIN,Role.AUTHOR,Role.USER),commentController.deleteComment);
router.put("/:commentId/moderate",auth(Role.ADMIN),commentController.moderateComment)


export default router;