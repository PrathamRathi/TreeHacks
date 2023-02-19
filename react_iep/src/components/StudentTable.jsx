import { useState, useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import axios from "axios";
import { BiExport } from "react-icons/bi";
import profile from "../assets/studentPic.svg";
import iepProfile from "../assets/iepStudentPic.svg";
import "../styles/StudentTable.css";

const ENV = "http://127.0.0.1:8000/api/";
const IEP = ENV + "ieps/";
const STUDENTS = ENV + "students/";

const Student = ({ student }: props) => {
  const [show, setShow] = useState(false);
  const [acom, setAcom] = useState();

  useEffect(() => {
    if (show) {
      axios.get(IEP).then((res) => {
        let studentOne;
        res.data.map((iep) => {
          if (iep.student === student.uuid) {
            setAcom(iep.accommodation);
          }
        });
      });
    }
  }, [show]);

  useEffect(() => {
    console.log(acom);
  }, [acom]);
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
      <div>
        <div className="iepstudent">
          <div className="header">
            <img
              src={iepProfile}
              alt="student profile"
              width="100"
              onClick={() => setShow(true)}
            />
            <BiExport size={25} style={{ color: "#FFB20C" }} />
          </div>
          <div className="iepname">
            <h1>{student.name}</h1>
            <p>{`(IEP: ${student.disability})`}</p>
          </div>
        </div>
        {show ? (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header"></div>
              <div className="modal-title">
                <div
                  className="modal-body"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p>{acom}</p>
                  <button onClick={() => setShow(false)}>Close</button>
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
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
