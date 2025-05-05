import { create } from 'zustand'

interface Note{
  id: number,
  text: string,
  isExpanded:boolean
}
interface NoteProps{
  note: Note[];
  saveNote: (text:string) => void;
  editNote: (id: number) => void;
  updateNote: (id: number, newText: string) => void;
  deleteNote: (id: number) => void;
}

export const useNote = create<NoteProps>((set) => ({
  note: [],
  saveNote: (text:string) => set((state) => {
    if (text.trim() !== "") {
      const newNote = { id: Date.now(), text, isExpanded:false };
      return { note: [...state.note, newNote] };
    }
    return state;
  }),
  editNote: (id: number) => set((state) => ({
    note:state.note.map((n)=> n.id === id ? {...n, isExpanded:!n.isExpanded}:n)
  })),
  updateNote: (id: number, newText: string) => set((state) => ({
    note:state.note.map((n)=> n.id === id?{...n,text:newText}:n)
  })),
  deleteNote: (id: number) => set((state) => ({
    note:state.note.filter((n)=> n.id !== id)
  }))
}))