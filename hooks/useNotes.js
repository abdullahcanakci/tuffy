import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import useUser from "./useUser";

const useTags = ({ tag = null } = {}) => {
  const { user } = useUser();
  const { data: notes } = useSWR(user?.isLoggedIn && "/api/notes/list");

  const notesLoading = notes === undefined;
  return { notes, notesLoading };
};

export default useTags;
