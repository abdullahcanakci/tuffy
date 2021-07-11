import { NoteService } from "services";
import useSWR from "swr";
import useUser from "./useUser";

const useNote = ({ id, note: oldNote } = {}) => {
  const { user } = useUser();
  const { data: note } = useSWR(
    user?.isLoggedIn && `/api/notes/${oldNote?.id ?? id}`
  );
  const noteLoading = note === undefined;

  return {
    data: note ?? oldNote,
    loading: noteLoading,
  };
};

export default useNote;
