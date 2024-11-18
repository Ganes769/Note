import { createContext, useContext, useEffect, useState } from "react";
import { NoteData } from "../pages/NewNote";
import { ReactNode } from "@tanstack/react-router";
interface NoteType {
  noteData: NoteData[];
  setNotedata: React.Dispatch<React.SetStateAction<NoteData[]>>;
}
const NoteContext = createContext<NoteType>({
  noteData: [],
  setNotedata: () => {},
});
export function NoteProvider({ children }: ReactNode) {
  const [noteData, setNotedata] = useState<NoteData[]>(() => {
    // Initialize state from localStorage, if available
    const savedNotes = localStorage.getItem("noteData");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  useEffect(() => {
    // Save noteData to localStorage whenever it changes
    localStorage.setItem("noteData", JSON.stringify(noteData));
  }, [noteData]);
  return (
    <NoteContext.Provider value={{ noteData, setNotedata }}>
      {children}
    </NoteContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useNoteContext() {
  return useContext(NoteContext);
}
