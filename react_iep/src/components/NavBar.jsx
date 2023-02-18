import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/logo.svg";
import profile from "../assets/profilePic.svg";
import "../styles/NavBar.css";
const LESSONS = "/lessons";
const GRADES = "/grades";
const STUDENTS = "/students";

const NavBar = () => {
  const navigate = useNavigate();
  const urlPath = window.location.pathname;

  function goHome() {
    navigate("/");
  }

  function goLessons() {
    navigate("/lessons");
  }

  function goGrades() {
    navigate("/grades");
  }

  function goStudents() {
    navigate("/students");
  }

  return (
    <div className="navBar">
      <div className="logo" onClick={goHome}>
        <img src={logo} alt="logo" width="100" height="100" />
        <h1>AdaptEd</h1>
      </div>
      <div className="navigation">
        <p onClick={goLessons} id={urlPath === LESSONS ? "selected" : ""}>
          Lessons
        </p>
        <p onClick={goGrades} id={urlPath === GRADES ? "selected" : ""}>
          Grades
        </p>
        <p onClick={goStudents} id={urlPath === STUDENTS ? "selected" : ""}>
          Students
        </p>
        <img src={profile} alt="profile picture" />
      </div>
    </div>
  );
};

export default NavBar;
