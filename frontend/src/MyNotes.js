import React from "react";
import "./MyNotes.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
//import notes from "./notes.js";
import { useEffect, useState } from "react";
import "./styles/NotesPopup.css";
import "./styles/CreateNotes.css";
import axios from "axios";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [popupcontent, setPopupcontent] = useState([]);
  const [popuptoggle, setPopuptoggle] = useState(false);
  const [error, setError] = useState(false);
  const [deleteid, setDeleteid] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const createHandler = async (e) => {
    e.preventDefault();

    try {
      const userInf = localStorage.getItem("userInfo");
      const v = JSON.parse(userInf);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${v.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/notes/create`,
        { title, content, category },
        config
      );
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const changeContent = (note) => {
    setPopupcontent([note]);
    setPopuptoggle(!popuptoggle);
  };
  const [createNotes, setCreateNotes] = useState(false);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure nigga ?")) {
      try {
        const userInf = localStorage.getItem("userInfo");
        const v = JSON.parse(userInf);
        console.log(v.token);
        console.log(v);
        const config = {
          headers: {
            Authorization: `Bearer ${v.token}`,
            //"Content-type": "application/json",
          },
        };

        const { data } = axios.delete(`/api/notes/${id}`, config);
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  // const fetchNotes = async () => {
  //   const { data } = await axios.get("/api/notes");
  //   //destructuring
  //   //console.log(data); // now we will get only and array of objects
  //   setNotes(data);
  // };

  const fetchNotes = async () => {
    try {
      const userInf = localStorage.getItem("userInfo");
      const v = JSON.parse(userInf);
      console.log(v.token);
      console.log(v);
      const config = {
        headers: {
          Authorization: `Bearer ${v.token}`,
          //"Content-type": "application/json",
        },
      };

      const { data } = await axios.get(`/api/notes`, config);
      console.log(data);
      setNotes(data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    //use effect is fired off whenever this a page is render (basically whenever a aprticular component is rendered in this case this page is rendered)
    fetchNotes();
  }, []);
  //console.log(notes);
  return (
    <div className={popuptoggle ? "my_notes_screen popup" : "my_notes_screen"}>
      <div className="left_col">
        <div className="dashboard_button">
          <DashboardIcon className="dashboard_icon" />
          <p className="dashboard_text">Dashboard</p>
        </div>
        <div className="add_note_button" onClick={() => setCreateNotes(true)}>
          <AddIcon />
        </div>
      </div>

      <div className="right_col">
        {/* <div className="right_col_container"> */}
        {notes.map((note) => (
          <div className="notes_card" onClick={() => changeContent(note)}>
            <div className="notes_card_title">{note.title}</div>
            <button className="notes_card_tag">{note.category}</button>
            <div className="notes_card_icons">
              <DeleteOutlineIcon
                onClick={() => deleteHandler(note._id)}
                className="notes_card_delete_button"
              />
              <EditIcon className="notes_card_edit_button" />
            </div>
          </div>
        ))}
        {/* </div> */}
      </div>

      {/* note popup */}

      {popuptoggle &&
        popupcontent.map((pop) => {
          return (
            <div className="notes_popup_container">
              <div className="notes_popup_container_header_color">Note</div>
              <div className="notes_popup_title">{pop.title}</div>
              <div className="notes_popup_content">{pop.content}</div>
              <button className="notes_popup_tag">{pop.category}</button>
              <div
                className="notes_popup_close_button"
                onClick={() => setPopuptoggle(false)}
              >
                Close
              </div>
            </div>
          );
        })}

      {createNotes && (
        <div
          className={
            createNotes
              ? "create_notes_container"
              : "create_notes_container closed"
          }
        >
          <div className="create_notes_title_wrapper">
            <div className="create_notes_title_head">Title</div>
            <div className="create_notes_title_input_box">
              <input
                type="text"
                className="create_notes_title_input_field"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="create_notes_content_wrapper">
            <div className="create_notes_content_head">Content</div>
            <div className="create_notes_content_input_box">
              <input
                type="text"
                placeholder="Content..."
                className="create_notes_content_input_field"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="create_notes_tag_wrapper">
            <div className="create_notes_tag_head">Tag</div>
            <div className="create_notes_tag_input_box">
              <input
                type="text"
                placeholder="Tag..."
                className="create_notes_tag_input_field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="create_notes_button_wrapper">
            <div className="create_notes_create_button" onClick={createHandler}>
              Create
            </div>
            <div
              className="create_notes_close_button"
              onClick={() => setCreateNotes(false)}
            >
              Close
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNotes;
