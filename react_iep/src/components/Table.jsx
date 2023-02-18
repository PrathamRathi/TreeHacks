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

  useEffect(() => {
    console.log(window.location.pathname);
  }, []);

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
  const lessons = [
    // {
    //   id: 1,
    //   title: "Learning Math",
    //   overview: "Today, the kids will be learning math with a calculator.",
    //   objectives:
    //     "The kids will know how to use a calculator to compute simple math problems",
    // },
    // {
    //   id: 2,
    //   title: "Learning Writing",
    //   overview:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //   objectives:
    //     "They will be able to write out all the letters of the alphabet",
    // },
  ];

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
      <Modal onClose={() => setShow(false)} show={show} />
      {lessons.length > 0 ? (
        <div className="table">
          {lessons.map((lesson) => {
            return <TableItem key={lesson.id} lesson={lesson} />;
          })}
        </div>
      ) : (
        <DefaultTable />
      )}
    </div>
  );
};

export default Table;
