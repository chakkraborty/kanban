import React from "react";
import "./LoginPage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Router, useNavigate } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      //setLoading(true)

      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      //setLoading(false)
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login_page">
      <div className="create_notes_container">
        <div className="create_notes_title_wrapper">
          <div className="create_notes_title_head">Email Id</div>
          <div className="create_notes_title_input_box">
            <input
              type="text"
              className="create_notes_title_input_field"
              placeholder="Email Id..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="create_notes_content_wrapper">
          <div className="create_notes_content_head">Password</div>
          <div className="create_notes_content_input_box">
            <input
              type="text"
              placeholder="Content..."
              className="create_notes_content_input_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="create_notes_button_wrapper">
          <div className="create_notes_create_button" onClick={submitHandler}>
            Login
          </div>
          {/* <div className="create_notes_close_button">Close</div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
