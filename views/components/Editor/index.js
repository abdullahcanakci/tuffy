import classNames from "classnames";

const Editor = ({ selectedNote, setSelectedNote, ...rest }) => {
  return (
    <div className={classNames("bg-[#434c5e]", "w-full")}>
      <p>{selectedNote?.title}</p>
    </div>
  );
};

export default Editor;
