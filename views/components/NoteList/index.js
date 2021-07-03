import { useNotes } from "hooks";
import Note from "../Note";
import Spinner from "../Spinner";

const NoteList = ({ selectedTag, setSelectedNote }) => {
  const { notes, notesLoading } = useNotes({ tag: selectedTag });

  const renderLoading = () => {
    return <Spinner />;
  };

  const renderList = () => {
    return (
      <ul className="w-full">
        {notes.map((note) => (
          <div onClick={() => setSelectedNote(note)}>
            <Note key={note.id} note={note} />
          </div>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-column h-full w-1/4 bg-[#3b4252] text-[#d8dee9]">
      {notesLoading ? renderLoading() : renderList()}
    </div>
  );
};

export default NoteList;
