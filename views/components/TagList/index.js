import classNames from "classnames";
import { useTags } from "hooks";
import Spinner from "../Spinner";
import Tag from "../Tag";

const TagList = ({ selectedTag, setSelectedTag }) => {
  const { tags, tagsLoading } = useTags();

  const renderLoading = () => {
    return <Spinner />;
  };

  const renderList = () => {
    return (
      <ul className="w-full pl-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className=" "
            onClick={() => {
              setSelectedTag(tag);
            }}>
            <Tag tag={tag} />
          </div>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-column w-[200px] bg-[#1f1f1f] text-[#d8dee9] shadow-md">
      {tagsLoading ? renderLoading() : renderList()}
    </div>
  );
};

export default TagList;
