import { Autocomplete, Button, FormHelperText, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNoteContext } from "../NoteProvider/NoteContext";
import { ChevronLeft } from "lucide-react";
import "../components/lexica-text-editor/src/styles.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "@tanstack/react-router";
import LexicalTextEditor from "../components/lexica-text-editor/src/LexicalTextEditor";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid
// import { useNoteContext } from "../NoteProvider/NoteContext";
export interface NoteData {
  title: string;
  tags?: { title: string }[];
  body: string;
  id?: string;
}
export default function NewNote() {
  const { id } = useParams({ strict: false });
  console.log("ddd", window.location.pathname);

  const [selectedFile, setselectedFile] = useState<File[] | []>([]);
  const handleSelectedFile = (file: File[]) => {
    if (file.length > 0) {
      setselectedFile((prev) => [...prev, ...file]);
    }
  };
  const handleDelete = (fileName: string) => {
    setselectedFile((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };
  const { setNotedata, noteData } = useNoteContext();
  console.log("ccc", noteData);
  const defaultvalue: NoteData = {
    body: "",
    title: "",
  };
  const noteToEdit = noteData.find((note) => note.id === id);
  const { control, handleSubmit, reset, register, formState, setValue } =
    useForm<NoteData>({
      defaultValues: noteToEdit || { title: "", tags: [], body: "" },
    });
  const { errors } = formState;
  useEffect(() => {
    if (noteToEdit) {
      setValue("title", noteToEdit.title);
      setValue("tags", noteToEdit.tags);
      setValue("body", noteToEdit.body);
    }
  }, [noteToEdit, setValue, id]);
  function onsubmit(data: NoteData) {
    if (noteToEdit) {
      const updatedNote = { ...noteToEdit, ...data };
      setNotedata((prev) =>
        prev.map((note) => (note.id === id ? updatedNote : note))
      );
      toast.success("Note updated successfully");
    } else {
      const newNote = { ...data, id: uuidv4() };
      setNotedata((prev) => [...prev, newNote]);
      toast.success("Note added successfully");
    }
    navigate({ to: "/" });
    reset();
  }

  const navigate = useNavigate();
  function backToHome() {
    navigate({ to: "/" });
  }
  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="w-fit  mx-auto flex flex-col gap-5 py-8">
          <h2 className="text-xl font-semibold mb-4">
            {id ? "Edit Note" : "NewNote"}
          </h2>
          <div onClick={backToHome} className="w-fit">
            <Button type="button" variant="contained">
              <ChevronLeft color="white" size={28} />
            </Button>
          </div>
          <div className="flex gap-2 justify-betweenitems-center">
            <div className=" w-1/2">
              <Controller
                {...register("title", { required: true })}
                defaultValue={defaultvalue.title}
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ width: "100%" }}
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                  />
                )}
              />
              {errors.title && (
                <FormHelperText sx={{ color: "red" }}>
                  Title is required
                </FormHelperText>
              )}
            </div>
            <Controller
              defaultValue={defaultvalue.tags}
              control={control}
              name="tags"
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  sx={{ width: "45%" }}
                  multiple
                  id="tags-outlined"
                  options={tags}
                  onChange={(_, value) => field.onChange(value)}
                  getOptionLabel={(option) => option.title}
                  // defaultValue={[tags[13]]}
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" placeholder="Tags" />
                  )}
                />
              )}
            />
          </div>
          <div>
            <Controller
              {...register("body", { required: false })}
              name="body"
              control={control}
              render={({ field }) => (
                <LexicalTextEditor
                  {...field}
                  onFileDelete={handleDelete}
                  onChange={field.onChange}
                  defaultValue={noteToEdit?.body || ""}
                  handleSelectedFile={handleSelectedFile}
                  selectedFile={selectedFile}
                />
              )}
            />
            {errors.body && (
              <FormHelperText sx={{ color: "red" }}>
                Body is required
              </FormHelperText>
            )}
          </div>

          <div className=" flex gap-3">
            <Button type="submit" variant="contained">
              Create
            </Button>

            <Button
              onClick={() => {
                reset();
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </div>
        </div>
        <div></div>
      </form>
    </>
  );
}
const tags = [
  { title: "To-Do" },
  { title: "Ideas" },
  { title: "Brainstorm" },
  { title: "Meeting" },
  { title: "Notes" },
  { title: "Reminders" },
  { title: "Goals" },
  { title: "Research" },
  { title: "Inspiration" },
  { title: "Project" },
  { title: "Work" },
  { title: "Personal" },
  { title: "Home" },
  { title: "Shopping" },
  { title: "Lists" },
  { title: "Tasks" },
  { title: "Productivity" },
  { title: "Health" },
  { title: "Finance" },
  { title: "Motivation" },
];
