// export const getAllNotes= (req,res)=>{
//     res.status(200).send("You just fetched the notes");
// };

import Note from "../models/Note.js";


export async function getAllNotes(req,res) {
    try{
        const notes=await Note.find().sort({createdAt:-1});
        res.status(200).json(notes)
    } catch (error){
        console.error("Error in getAllNotes controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function getNoteById(req,res){
    try{
        const note=await Note.findById(req.params.id);
        if(!note) res.status(404).json({message:"Note not found, Can't be get"});
        res.json({message:"Note succesfully retrieved",note});
    }catch (error){
        console.error("Error in getNoteById controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function createNote(req,res){
    try{
        const {title,content}=req.body
        const newNote=new Note({title,content})

        await newNote.save()
        res.status(201).json({message:"Note created succesfully!"})
    }catch (error){
        console.error("Error in createNote controller",error);
        res.status(500).json({message:"Internal server error"});
    }

}

export async function updateNote(req,res) {
    try{
        const {title,content}=req.body
        const updatedNote=await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {
                new:true,
            }
        );
        if(!updatedNote) return res.status(404).json({message:"Note not Found"});
        res.status(200).json({message:"Note updated succesfully"})
    }catch (error){
        console.error("Error in updateNote controller",error);
        res.status(500).json({message:"Internal server error"});
    }

}

export async function deleteNote(req,res){
    try{
       const deletedNote= await Note.findByIdAndDelete(req.params.id);
       if(!deletedNote) res.status(400).json({message:"Note not found..So cant be deleted"});
       res.json({message:"Note deleted succesfully"});
    }catch (error){
        console.error("Error in deleteNote controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}
