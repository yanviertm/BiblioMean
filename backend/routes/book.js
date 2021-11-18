import express from "express";
import book from "../controllers/book.js";
import admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/registerBook", auth, admin, book.registerBook);
router.get("/listBook", auth, book.listBook);
router.get("/findBook/:_id", auth, book.findBook);
router.put("/updateBook", auth, admin, book.updateBook);
router.delete("/deleteBook/:_id", auth, admin, book.deleteBook);

export default router;
