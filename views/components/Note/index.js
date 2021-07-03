const Note = ({ note }) => {
  return (
    <li className="py-1 pl-3 w-full">
      <div>
        <h3>{note.title}</h3>
      </div>
    </li>
  );
};

export default Note;
