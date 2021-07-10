import { TagService } from "services";
import useSWR from "swr";
import useUser from "./useUser";

const useTags = ({ key = null } = {}) => {
  const { user } = useUser();
  const { data: tags, mutate: mutateTags } = useSWR(
    user?.isLoggedIn && "/api/tags"
  );
  const tagsLoading = tags === undefined;

  const createTag = (name) => {
    const tag = TagService.createTag(name);
    mutateTags([...tags, tag], false);
  };

  return { tags, tagsLoading, createTag };
};

export default useTags;
