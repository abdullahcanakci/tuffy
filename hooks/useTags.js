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

  const deleteTag = (id) => {
    TagService.deleteTag(id);
    mutateTags(
      tags.filter((tag) => tag.id != id),
      false
    );
  };

  return { tags, tagsLoading, createTag, deleteTag };
};

export default useTags;
