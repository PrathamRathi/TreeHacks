import { useState, useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import axios from "axios";
import { BiExport } from "react-icons/bi";
import profile from "../assets/studentPic.svg";
import iepProfile from "../assets/iepStudentPic.svg";
import "../styles/StudentTable.css";

const ENV = "http://127.0.0.1:8000/api/";
const STUDENTS = ENV + "students/";

const Student = ({ student }: props) => {
  if (student.disability === "None") {
    return (
      <div className="student">
        <div className="header">
          <img src={profile} alt="student profile" width="100" />
          <BiExport className="export" size={25} style={{ color: "#4F8FFF" }} />
        </div>
        <h1>{student.name}</h1>
      </div>
    );
  } else {
    return (
      <div className="iepstudent">
        <div className="header">
          <img src={iepProfile} alt="student profile" width="100" />
          <BiExport size={25} style={{ color: "#FFB20C" }} />
        </div>
        <div className="iepname">
          <h1>{student.name}</h1>
          <p>{`(IEP: ${student.disability})`}</p>
        </div>
      </div>
    );
  }
};

const StudentTable = () => {
  const [students, setStudents] = useState();

  useEffect(() => {
    axios.get(STUDENTS).then((res) => {
      console.log(res.data);
      setStudents(res.data);
    });
  }, []);

  return (
    <div className="studentPage">
      {students && students.length > 0 ? (
        <div className="table">
          {students.map((student) => {
            return <Student key={student.uuid} student={student} />;
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default StudentTable;
