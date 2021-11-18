import express from "express";
import admin from "../controllers/admin.js";
import auth from "../middleware/auth.js";
import adminMid from "../middleware/admin.js";

const router = express.Router();

router.post("/login", admin.login);
router.post("/registerAdmin", auth, adminMid, admin.registerAdmin);
router.get("/listAdmin", auth, adminMid, admin.listAdmin);
router.put("/updateAdmin", auth, adminMid, admin.updateAdmin);
router.delete("/deleteAdmin/:_id", auth, adminMid, admin.deleteAdmin);

export default router;
