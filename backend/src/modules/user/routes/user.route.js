import { Router } from "express";
import userController from "../controllers/user.controller.js";
import verifyRequestJwt from "../../../shared/middlewares/auth.middleware.js";
const router = Router();

router.get("/me", verifyRequestJwt, userController.getMe);

export default router;