import Express from "express";
import verifyUpdateAuth from "../Middleware/verifyUpdateAuth.js";
import { upload } from "./../Middleware/multer.middleware.js";
import {
  Registercontroller,
  Logincontroller,
  Updateuserprofile,
} from "../Controller/Authcontroller.js";
const router = Express.Router();
router.post("/Register", upload.single("pic"), Registercontroller);
router.post("/Login", Logincontroller);
router.put("/updateprofile/:userId", verifyUpdateAuth, Updateuserprofile);

export default router;
