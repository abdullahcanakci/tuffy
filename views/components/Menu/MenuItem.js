import classNames from "classnames";

const MenuItem = ({ label, onClick, icon, active }) => {
  return (
    <div onClick={() => onClick()} className="menu-item">
      <span className="icon">{icon}</span>
      <label>{label}</label>
    </div>
  );
};

export default MenuItem;
