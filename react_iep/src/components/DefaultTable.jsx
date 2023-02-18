import { useState } from "react";
import { RiAddFill } from "react-icons/ri";
import Modal from "./Modal";
import "../styles/DefaultTable.css";

const DefaultTable = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="table">
      <div className="tableItem">
        <p>You don't have any lesson plans! Click the&nbsp;&nbsp;</p>
        <button className="addExportBtn" onClick={() => setShow(true)}>
          <p>Add&nbsp;</p>
          <RiAddFill style={{ color: "#fff" }} />
        </button>
        <p>&nbsp;&nbsp;button to add one.</p>
      </div>
      <Modal onClose={() => setShow(false)} show={show} />
    </div>
  );
};

export default DefaultTable;
