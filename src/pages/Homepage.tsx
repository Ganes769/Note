import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { useNoteContext } from "../NoteProvider/NoteContext";
import "../components/lexica-text-editor/src/styles.css";

export default function Homepage() {
  const { noteData } = useNoteContext();
  const navigate = useNavigate();
  console.log("ccc", noteData);

  // Function to limit the HTML string to a plain text preview of 40 characters
  const getPreviewText = (htmlString: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    return plainText.length > 40
      ? plainText.substring(0, 250) + "..."
      : plainText;
  };
  function extractImageSrc(html: string): string | undefined {
    const div = document.createElement("div");
    div.innerHTML = html;
    const img = div.querySelector("img");
    return img ? img.src : undefined;
  }
  return (
    <div
      className="w-full min-h-screen  relative overflow-hidden flex flex-col items-center justify-start py-10"
      // style={{
      //   backgroundImage: `url('https://images.pexels.com/photos/8332973/pexels-photo-8332973.jpeg')`,
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <div className="w-1/2 py-8 mx-auto flex flex-col justify-between items-center">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-xl font-semibold">Notes</h2>
          <div className="flex gap-3">
            <Link to="/new">
              <Button variant="contained">New Note</Button>
            </Link>
            <Button variant="outlined">Edit Note</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-start gap-6 flex-wrap">
        {noteData.map((item) => (
          <Card
            key={item.id}
            sx={{
              p: 0,
              maxWidth: 345,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardMedia
              sx={{ minHeight: 180 }}
              image={extractImageSrc(item.body)}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                {getPreviewText(item.body)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => {
                  navigate({ to: `/note/${item.id}` });
                }}
                size="small"
              >
                Explore
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}
