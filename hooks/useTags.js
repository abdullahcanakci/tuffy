import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import useUser from "./useUser";

const useTags = ({ key = null } = {}) => {
  const { user } = useUser();
  const { data: tags } = useSWR(user?.isLoggedIn && "/api/tags/list");

  const tagsLoading = tags === undefined;
  return { tags, tagsLoading };
};

export default useTags;
