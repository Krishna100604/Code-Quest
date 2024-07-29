import express from "express";
import { login, signup } from '../controller/auth.js';
import { getallusers, updateprofile, searchUsers } from "../controller/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/getallusers", getallusers);
router.get("/search", searchUsers);  // New route for searching users

router.patch("/update/:id", auth, updateprofile);

export default router;
