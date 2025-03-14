import React from "react";
import "./LeftStaticBar.scss";
import UserIcon from "../../icons/userIcon";

const LeftStaticBar = () => {
  return (
    <div className="LeftStaticBar-container">
      <div className="top-icon"></div>
      <div className="options-container">
        {Array.from({ length: 7 }).map((icons, index) => (
          <div className="option"></div>
        ))}
      </div>
      <div className="user-icon">
        <UserIcon />
      </div>
    </div>
  );
};

export default LeftStaticBar;
