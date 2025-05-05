import { useState } from "react";
import { useNote } from "./noteStore";

const NotesLayout = () => {


  const [text, setText] = useState<string>("")

  const {note,saveNote,editNote,updateNote, deleteNote} = useNote()

  const handleOnSave = () => {
    saveNote(text);
    setText("");
 }

  return (
    <div className="h-screen box-border flex flex-col items-center justify-center pt-10">
      <section className="w-3/4 relative h-3/5 mb-12">
        <textarea value={text} name="" onChange ={(e)=>setText(e.target.value)} placeholder="Enter the note...." className="placeholder:text-white resize-none p-3 outline-none  bg-stone-500 w-full h-[90%] rounded-md text-white" id=""></textarea>
        <button onClick={handleOnSave} className="bg-green-400  px-4 absolute bottom-0 py-1 rounded-sm right-0 shadow-md ">Save</button>
      </section>
      <section className="w-2/3 flex flex-wrap">
        {
          note.map((n) => (
      
              <div key={n.id} className=' m-2 relative p-2 text-white rounded-md bg-stone-500 h-[7rem] w-[10rem] '>
              {n.isExpanded ? (
                <textarea
                  value={n.text}
                  onChange={(e) => updateNote(n.id, e.target.value)
                  }
                  className='  outline-none resize-none  text-white rounded-md bg-stone-500 h-[6rem] w-[9rem]  '
                />
              ) : (
                  <div>{n.text}</div>
              )}
              <button className="absolute left-2 bottom-2" onClick={()=>deleteNote(n.id)}>Delete</button>
              <button onClick={()=>editNote(n.id)}
                className="absolute text-white bottom-2 right-2 ">{
                  n.isExpanded ? "Save":"Edit"
                }</button>
              </div>
           
          ))
        }
      </section>
      
    </div>
  );
}

export default NotesLayout;
