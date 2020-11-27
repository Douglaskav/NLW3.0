import React from "react";
import "../styles/components/Switch.css";

interface SwitchProps {
  isOn: boolean;
  handleStateSwitch: any;
}

const Switch = (props: SwitchProps) => {
  return (
    <>
      <input
        className="checkboxSwitch"
        id={`switch-new`}
        type="checkbox"
        checked={props.isOn}
        onChange={props.handleStateSwitch}
      />
      <label
        className="switchLabel"
        htmlFor={`switch-new`}
      >
        <span className="switchButton" />
      </label>
    </>
  );
};

export default Switch;
