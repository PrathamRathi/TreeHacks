import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Grades.css";

const MATH = "math";
const READ = "reading";
const ENV = "http://127.0.0.1:8000/api/";
const GRADES = ENV + "grades/";

const GradesRow = ({ student }: props) => {
  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.id}</td>
      <td>{student.percent}</td>
      <td>{student.grade}</td>
    </tr>
  );
};

const GradesTable = () => {
  const [subject, setSubject] = useState("math");
  const [mathGrades, setMathGrades] = useState();
  const [readGrades, setReadGrades] = useState();

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
      setReadGrades(readArr);
    });
  }, []);

  return (
    <div className="container">
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
      <table>
        <tbody>
          {mathGrades && mathGrades.length > 0 ? (
            <>
              <tr>
                <th>Full Name</th>
                <th>Student ID</th>
                <th>Percentage</th>
                <th>Grade</th>
              </tr>
              {mathGrades.map((grade) => {
                return <GradesRow key={grade.id} student={grade} />;
              })}
            </>
          ) : (
            <div></div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GradesTable;
