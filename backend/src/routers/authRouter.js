import express from "express";
import { Router } from "express";
const app = express()
import { logout, siginup, login, onboard } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/signup", siginup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/onboarding", protectRoute, onboard)


router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({ success: true, user:req.user });

})



export default router