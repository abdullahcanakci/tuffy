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
      <ul className="w-full">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={classNames({
              "bg-[#3b4252]": selectedTag?.id == tag.id,
            })}
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
    <div className="flex flex-column w-24 bg-[#2e3440] text-[#d8dee9] shadow-md">
      {tagsLoading ? renderLoading() : renderList()}
    </div>
  );
};

export default TagList;
