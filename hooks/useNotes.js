import { NoteService } from "services";
import useSWR from "swr";
import useUser from "./useUser";

const useNotes = ({ key = null } = {}) => {
  const { user } = useUser();
  const { data: notes, mutate: mutateNotes } = useSWR(
    user?.isLoggedIn && "/api/notes"
  );
  const notesLoading = notes === undefined;

  const createNote = (name) => {
    const note = NoteService.createNote(name);
    mutateNotes([...notes, note], false);
  };

  const deleteNote = (id) => {
    NoteService.deleteNote(id);
    mutateNotes(
      notes.filter((note) => note.id != id),
      false
    );
  };

  return { data: notes, loading: notesLoading, createNote, deleteNote };
};

export default useNotes;
