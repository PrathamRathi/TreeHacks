import { BarLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { RiAddFill } from "react-icons/ri";
import { BiExport } from "react-icons/bi";
import Modal from "./Modal";
import DefaultTable from "./DefaultTable";
import "../styles/Table.css";

const TableItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { lesson } = props;

  function clicked() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }

  return (
    <div className="tableRow">
      <div className="lessonPlan">
        <h1>{lesson.title}</h1>
        <p>{lesson.overview}</p>
      </div>
      <div className="view">
        {isLoading ? (
          <div className="cell">
            <BarLoader width="160px" />
          </div>
        ) : (
          <button onClick={clicked} className="viewBtn">
            View
          </button>
        )}
      </div>
    </div>
  );
};

const Table = () => {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem("formData") !== undefined) {
      console.log(`submitting ${window.localStorage.getItem("formData")}`);
      let parsed = JSON.parse(window.localStorage.getItem("formData"));
      if (lessons) {
        setLessons([
          ...lessons,
          {
            title: parsed.lessonPlan,
            overview: parsed.overview,
            objectives: parsed.objectives,
          },
        ]);
      } else {
        setLessons([
          {
            title: parsed.lessonPlan,
            overview: parsed.overview,
            objectives: parsed.objectives,
          },
        ]);
      }
    }
  }, [submitted]);

  return (
    <div className="tablePage">
      <div className="buttons">
        <button className="addExportBtn" onClick={() => setShow(true)}>
          <p>Add&nbsp;</p>
          <RiAddFill style={{ color: "#fff" }} />
        </button>
        <button className="addExportBtn">
          <p>Export&nbsp;</p>
          <BiExport style={{ color: "#fff" }} />
        </button>
      </div>
      <Modal
        onClose={() => setShow(false)}
        show={show}
        onSubmit={() => setSubmitted(true)}
      />
      {lessons && lessons.length > 0 ? (
        <div className="table">
          {lessons.map((lesson) => {
            return <TableItem key={lesson.title} lesson={lesson} />;
          })}
        </div>
      ) : (
        <DefaultTable />
      )}
    </div>
  );
};

export default Table;
