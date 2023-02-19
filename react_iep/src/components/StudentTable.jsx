import "../styles/StudentTable.css";

const Student = ({ student }: props) => {
  return (
    <div className="student">
      <h1>{student.name}</h1>
    </div>
  );
};

const StudentTable = () => {
  const students = [
    {
      name: "John Smith",
    },
    {
      name: "Jane Doe",
    },
    {
      name: "Megan Trainor",
    },
  ];
  return (
    <div className="studentPage">
      <div className="table">
        {students.map((student) => {
          return <StudentTable student={student} />;
        })}
      </div>
    </div>
  );
};

export default StudentTable;
