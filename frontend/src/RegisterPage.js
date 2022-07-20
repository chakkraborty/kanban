import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);

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
        "/api/users",
        {
          name,
          email,
          password,
        },
        config
      );
      console.log(data);
      //localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/login");
      //setLoading(false)
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  return (
    <div className="login_page">
      <div className="create_notes_container">
        <div className="create_notes_content_wrapper">
          <div className="create_notes_content_head">Username</div>
          <div className="create_notes_content_input_box">
            <input
              type="text"
              placeholder="Username..."
              value={name}
              className="create_notes_content_input_field"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
        </div>

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
            Signup
          </div>
          {/* <div className="create_notes_close_button">Close</div> */}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
