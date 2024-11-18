import { useParams, useNavigate } from "@tanstack/react-router";
import { useNoteContext } from "../NoteProvider/NoteContext";
import { Button, Typography } from "@mui/material";
import { ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function NoteDetail() {
  const { id } = useParams({ from: "/note/$id" }) as { id: string }; // Extract ID from URL
  const navigate = useNavigate();
  const { noteData, setNotedata } = useNoteContext(); // Find the note that matches the ID
  const note = noteData.find((note) => note.id === id);

  // If note is not found, show a message
  if (!note) {
    return <div>Note not found</div>;
  }

  function deleteNote(id?: string) {
    setNotedata(noteData.filter((item) => item.id !== id));
    navigate({ to: "/" });
  }

  return (
    <div className="w-full p-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center mb-4">
          <Button variant="outlined" onClick={() => navigate({ to: "/" })}>
            <ChevronLeft color="#1976D2" size={28} />
          </Button>
          <Typography variant="h4" sx={{ ml: 2 }}>
            <span className="uppercase">{note.title}</span>
          </Typography>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <Typography variant="body1">
            {/* Render note body as HTML */}
            <div dangerouslySetInnerHTML={{ __html: note.body }} />
          </Typography>
        </div>
        <div className=" mt-4 flex gap-3">
          <Button
            onClick={() => {
              navigate({ to: `/edit/${note.id}` });
            }}
            color="info"
            variant="contained"
          >
            Edit Note
          </Button>

          <Button
            color="error"
            onClick={() => {
              deleteNote(note.id);
              toast.error("Note deleted successfully");
            }}
            variant="outlined"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
