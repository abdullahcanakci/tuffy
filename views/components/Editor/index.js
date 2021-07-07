import classNames from "classnames";
import dynamic from "next/dynamic";
import Spinner from "../Spinner";

const Milkdown = dynamic(() => import("../Milkdown"), {
  loading: () => <Spinner />,
});

const Editor = ({ selectedNote, setSelectedNote, ...rest }) => {
  return (
    <div className={classNames("bg-[#434c5e]", "w-full")}>
      <Milkdown />
    </div>
  );
};

export default Editor;
