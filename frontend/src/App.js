//import logo from './logo.svg';
import "./App.css";
import Navbar from "./components/Navbar/Navbar.js";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./MyNotes.js";
import LoginPage from "./LoginPage.js";
import RegisterPage from "./RegisterPage.js";
import { useEffect } from "react";

const App = () => {
  const hello = 1;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/mynotes" element={myNotes} /> */}
        <Route path="/mynotes" element={<MyNotes />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <div>HELLO WORLD! {hello}</div> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
