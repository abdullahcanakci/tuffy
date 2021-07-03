import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import useUser from "./useUser";

const useTags = ({ tag = null } = {}) => {
  const { user } = useUser();
  const { data: notes } = useSWR(() => {
    console.log("swr", tag);
    if (!user || !user.isLoggedIn) return false;
    if (tag) return `/api/tags/${tag.id}/notes`;
    return `/api/notes`;
  });

  useEffect(() => {
    console.log("usenotes", tag);
  }, [tag]);

  const notesLoading = notes === undefined;
  return { notes, notesLoading };
};

export default useTags;
