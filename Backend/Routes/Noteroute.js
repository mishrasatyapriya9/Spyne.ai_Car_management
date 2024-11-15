import Express from "express";
import Notemodel from "../Models/Notemodel.js";
import verifyuserforGetAllNotes from "../Middleware/verifyuserforGetAllNotes.js";
import {verifyJWT} from "../Middleware/Authmiddlware.js"

import {
  CreateNotecontroller,
  DeleteNotecontroller,
  GetallNotecontroller,
  EditNotecontroller,
  GetNotecontroller,
} from "../Controller/Notecontroller.js";
const router = Express.Router();

//for create notes or get all the notes we have to pass the token after we get by login in the headers with Bearer for the middleware checking
router.post("/createnote", verifyJWT, CreateNotecontroller);
router.get("/getallnote", verifyuserforGetAllNotes, GetallNotecontroller);
router.get("/getnote/:id", GetNotecontroller);
router.put("/editnote/:id", verifyuserforGetAllNotes, EditNotecontroller);
router.delete(
  "/deletenote/:id",
  verifyuserforGetAllNotes,
  DeleteNotecontroller
);

export default router;
