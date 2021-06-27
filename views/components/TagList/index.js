import { useTags } from "hooks";

const TagList = () => {
  const { tags, tagsLoading } = useTags();

  if (tagsLoading) {
    return <p>Loading Tags...</p>;
  }

  return (
    <div>
      {tags.map((tag) => (
        <p key={tag.id}>{tag.name}</p>
      ))}
    </div>
  );
};

export default TagList;
