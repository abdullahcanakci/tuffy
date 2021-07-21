const { useState, useRef, useEffect } = require("react");
import { Card, Menu, Portal } from "..";
import styles from "./dropdown.module.scss";

const Dropdown = ({ options, echoOption = false, label: passedLabel }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [label, setLabel] = useState(passedLabel);
  const buttonRef = useRef(null);

  const handleOptionClick = (option) => {
    if (echoOption) {
      setLabel(option.label);
    }
    if (typeof option.onClick === "function") {
      option.onClick(option);
    }
  };
  useEffect(() => {
    if (!passedLabel && options?.length > 0) {
      handleOptionClick(options[0]);
    }
  }, []);

  const renderDropdown = () => {
    if (!showDropdown) return <></>;
    return (
      <Portal
        x={buttonRef.current.getBoundingClientRect().left}
        y={buttonRef.current.getBoundingClientRect().bottom}
        outside={() => setShowDropdown(false)}>
        <Card
          style={{
            width: `${
              buttonRef.current.getBoundingClientRect().right -
              buttonRef.current.getBoundingClientRect().left
            }px`,
          }}>
          {options?.map((option, index) => (
            <Menu.Item
              key={option.label}
              label={option.label}
              onClick={() => handleOptionClick(option)}
            />
          ))}
        </Card>
      </Portal>
    );
  };

  return (
    <>
      <button
        className={styles.dropdown}
        icon="heart"
        onClick={() => setShowDropdown((e) => !e)}
        ref={buttonRef}>
        {label}
      </button>
      {renderDropdown()}
    </>
  );
};

export default Dropdown;
