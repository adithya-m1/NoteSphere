import React from 'react';
import { useState, useEffect  } from 'react';
import Navbar from "../components/Navbar";  
//import RateLimitedUI from '../components/RateLimitedUI';
import toast from "react-hot-toast"; 
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';
import api from "../lib/axios";

function HomePage() {
  //const [isRateLimited  , setRateLimited]=useState(true); 
  const [notes, setNotes]= useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
       const fetchNotes=async () =>{
         try{
          const res= await api.get("/notes");  
          console.log(res.data); 
          setNotes(res.data);
          //setRateLimited(false);
         }catch(error){
          console.log("Error fetching Notes",error);
          console.log(error); 
          // if(error.response?.status === 429){
          //   //setRateLimited(true);
          // }
          toast.error("Failed to load notes. Damn!!")
         } finally {
          setLoading(false);
         }
       }
       fetchNotes();
  },[]); 
    
  return (
    <div className="min-h-screen">
    {/*<Navbar/>*/}

     {/*{isRateLimited && <RateLimitedUI />}*/}

     <div className="max-w-7xl mx-auto p-4 mt-6">
      
       {loading && <div className="flex flex-col items-center justify-center py-20 text-center">
  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-6"></div>
  <h2 className="text-2xl md:text-3xl font-semibold text-primary">Loading Notes...</h2>
  <p className="text-base text-base-content/70 mt-2">Hang tight! We're getting your notes ready.</p>
</div>
 }
       {notes.length ==0  && <NotesNotFound /> }
       {notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <NoteCard key={note._id} note={note} setNotes={setNotes}/> 
          ))}
        </div>
       )}
    </div>
    </div>
  )
}

export default HomePage;
