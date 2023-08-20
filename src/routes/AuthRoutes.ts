import express from "express";
import { Register, Login, CheckToken } from "../controllers/AuthControllers";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/check-token", CheckToken)

export default router;