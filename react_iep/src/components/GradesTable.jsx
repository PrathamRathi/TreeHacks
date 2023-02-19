import { useState } from "react";
import "../styles/Grades.css";

const MATH = "math";
const READ = "reading";

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
  const mathGrades = [
    {
      name: "John Smith",
      id: 1234,
      percent: "98",
      grade: "A",
    },
    {
      name: "Jane Smith",
      id: 123234,
      percent: "96",
      grade: "A",
    },
    {
      name: "Joe Rogan",
      id: 123214,
      percent: "68",
      grade: "D+",
    },
  ];
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
      </table>
    </div>
  );
};

export default GradesTable;
