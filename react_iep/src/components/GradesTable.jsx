import { useState, useEffect } from "react";
import calculateGrade from "../utils/calculateGrade";
import { RiAddFill } from "react-icons/ri";

import axios from "axios";
import "../styles/Grades.css";

const MATH = "math";
const READ = "reading";
const ENV = "http://127.0.0.1:8000/api/";
const GRADES = ENV + "grades/";
const STUDENTS = ENV + "students/";

const GradesRow = ({ student }: props) => {
  return (
    <tr>
      <td>{student.student}</td>
      <td>{student.percentage}</td>
      <td>{calculateGrade(student.percentage)}</td>
    </tr>
  );
};

const GradesTable = () => {
  const [subject, setSubject] = useState("math");
  const [mathGrades, setMathGrades] = useState();
  const [readGrades, setReadGrades] = useState();
  const [percentage, setPercentage] = useState();
  const [studentID, setStudentID] = useState();
  const [modalSubject, setModalSubject] = useState();
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState();
  const [studentObj, setStudentObj] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    axios.get(GRADES).then((res) => {
      console.log(res.data);
      const mathArr = [];
      const readArr = [];
      res.data.forEach((grade) => {
        if (grade.subject === "Math") {
          mathArr.push(grade);
        } else {
          readArr.push(grade);
        }
      });
      setMathGrades(mathArr);
      console.log(mathArr);
      setReadGrades(readArr);
    });
    axios.get(STUDENTS).then((res) => {
      setStudents(res.data);
      const stringData = [];
      res.data.map((student) => {
        stringData.push(JSON.stringify(student));
      });
      setStudentObj(stringData);
    });
  }, []);

  function submitGrade(event) {
    event.preventDefault();
    const gradeData = {
      student: studentID,
      percentage: Number(percentage),
      subject: modalSubject,
      date: date,
    };
    console.log(gradeData);
    axios.post(GRADES, gradeData).then((res) => {
      console.log(res);
    });
  }

  const handleChange = (event) => {
    console.log(event);
    switch (event.target.name) {
      case "percentage":
        setPercentage(event.target.value);
        break;
      case "subject":
        setModalSubject(event.target.value);
        break;
      case "studentID":
        setStudentID(JSON.parse(event.target.value));
        break;
      case "date":
        setDate(event.target.value);
        break;
    }
  };

  return (
    <div className="container">
      <div className="topHeader">
        <div className="tabs">
          <p
            onClick={() => setSubject(MATH)}
            id={subject === MATH ? "select" : ""}
          >
            Math
          </p>
          <p
            onClick={() => setSubject(READ)}
            id={subject === READ ? "select" : ""}
          >
            Reading & Writing
          </p>
        </div>
        <div className="edit">
          <button
            onClick={() => setShow(true)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Add&nbsp;
            <RiAddFill style={{ color: "#fff" }} />
          </button>
          {show && (
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header"></div>
                <div className="modal-title">
                  <div className="modal-body">
                    <form onSubmit={submitGrade}>
                      <label htmlFor="studentID">Student ID:</label>
                      <select
                        onChange={handleChange}
                        name="studentID"
                        id="studentID"
                      >
                        <option disabled selected value>
                          {" "}
                          -- select an option --{" "}
                        </option>
                        {studentObj &&
                          studentObj.length > 0 &&
                          studentObj.map((student) => {
                            return (
                              <option key={student} value={student}>
                                {JSON.parse(student).uuid}
                              </option>
                            );
                          })}
                      </select>

                      <label htmlFor="percentage">Percentage</label>
                      <input
                        type="text"
                        id="percentage"
                        name="percentage"
                        onChange={handleChange}
                      />
                      <label htmlFor="subject">Subject</label>
                      <select
                        onChange={handleChange}
                        name="subject"
                        id="subject"
                      >
                        <option disabled selected value>
                          {" "}
                          -- select an option --{" "}
                        </option>
                        <option value="Math">Math</option>
                        <option value="Reading & Writing">
                          Reading & Writing
                        </option>
                      </select>
                      <label htmlFor="date">Date</label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        onChange={handleChange}
                      />
                      <div
                        style={{
                          display: "flex",
                          marginTop: "10px",
                          margin: "1rem",
                        }}
                      >
                        <button type="submit" className="button">
                          Submit
                        </button>
                        <button
                          onClick={() => setShow(false)}
                          className="button"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <table>
        <tbody>
          {subject === MATH ? (
            <>
              <tr>
                <th>Student ID</th>
                <th>Percentage</th>
                <th>Grade</th>
              </tr>
              {mathGrades &&
                mathGrades.length > 0 &&
                mathGrades.map((grade) => {
                  return <GradesRow key={grade.student} student={grade} />;
                })}
            </>
          ) : (
            <>
              <tr>
                <th>Student ID</th>
                <th>Percentage</th>
                <th>Grade</th>
              </tr>
              {readGrades &&
                readGrades.length > 0 &&
                readGrades.map((grade) => {
                  return <GradesRow key={grade.student} student={grade} />;
                })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GradesTable;
