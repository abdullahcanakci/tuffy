import { useTags } from "hooks";
import Tag from "../Tag";

const TagList = () => {
  const { tags, tagsLoading } = useTags();

  if (tagsLoading) {
    return <p>Loading Tags...</p>;
  }

  return (
    <div className="flex flex-column w-24">
      <ul className="w-full">
        {tags.map((tag) => (
          <Tag tag={tag} key={tag.id} />
        ))}
      </ul>
    </div>
  );
};

export default TagList;
