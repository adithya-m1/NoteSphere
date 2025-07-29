import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote,getNoteById } from "../controllers/notesController.js";
const router=express.Router();


router.get("/",getAllNotes);
router.get("/:id",getNoteById);
router.post("/",createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);

// router.put("/:id",(req,res)=>{
//     res.status(200).json({message:"Note updated Succesfully!"});
// });

//app.get("api/notes",(req,res)=>{
//     res.status(200).send({message:"Note created successfully!"});
// })

export default router;