import { Router } from "express";
import { authenticateLocal } from "../middlewares/AuthenticateLocal.js";
import { logoutController } from "../controllers/logout.controller.js";
const router = Router();

router.route("/").post(authenticateLocal);
router.route("/logout").post(logoutController);
export default router;
