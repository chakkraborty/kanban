import React from "react";
import { useState } from "react";
import "./Dropdown.css";
import { useNavigate } from "react-router-dom";
const Dropdown = () => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={dropdown ? "dropdown_main clicked" : "dropdown_main"}
      onClick={() => setDropdown(!dropdown)}
    >
      <div className="dropdown_item" onClick={() => setDropdown(false)}>
        Profile
      </div>

      <div className="dropdown_item" onClick={() => setDropdown(false)}>
        Notes
      </div>

      <div
        className="dropdown_item"
        onClick={() => {
          localStorage.removeItem("userInfo");
          navigate("/login");
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default Dropdown;
