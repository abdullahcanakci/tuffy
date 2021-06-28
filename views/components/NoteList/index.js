import { useNotes } from "hooks";
import Note from "../Note";
import Tag from "../Tag";

const NoteList = () => {
  const { notes, notesLoading } = useNotes();

  if (notesLoading) {
    return <p>Loading Notes...</p>;
  }

  return (
    <div className="flex flex-column w-1/4">
      <ul className="w-full">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
