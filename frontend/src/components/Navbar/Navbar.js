import React from "react";
import { useState } from "react";
import "./Navbar.css";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import SearchIcon from "@mui/icons-material/Search";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Dropdown from "./Dropdown.js";
const Navbar = () => {
  const [dropdown, setDropdown] = useState(true);
  return (
    <div className="navbar_main">
      <div className="navbar_logo_wrapper">
        <EventNoteIcon className="navbar_logo" />
        <h5 className="navbar_logo_text">Notes Overflow</h5>
      </div>

      <div className="navbar_search_wrapper">
        <SearchIcon className="search_icon" />
        <input
          type="text"
          className="navbar_search"
          placeholder="Search"
        ></input>
      </div>

      <li
        className="navbar_right_wrapper"
        onMouseEnter={() => setDropdown(true)}
        onMouseLeave={() => setDropdown(false)}
      >
        {/* <AccountBoxIcon className="navbar_account_icon" /> */}
        <div className="navbar_menu_button">
          <h5>Menu</h5>
        </div>
        {dropdown && <Dropdown />}
      </li>
    </div>
  );
};

export default Navbar;
