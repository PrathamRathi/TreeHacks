import { CgCloseR } from "react-icons/cg";
import "../styles/Modal.css";

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <CgCloseR className="close-icon" onClick={props.onClose} />
          <div className="modal-title">Add New Lesson Plan</div>
        </div>
        <div className="modal-body">
          <form action="">
            <div className="firstCol">
              <label htmlFor="lessonPlanTitle">Title of Lesson Plan</label>
              <input
                type="text"
                id="lessonPlanTitle"
                name="lessonPlanTitle"
                placeholder="Enter Name"
                required
              />
              <label htmlFor="subjectTitle">Subject</label>
              <input
                type="text"
                id="subjectTitle"
                name="subjectTitle"
                placeholder="Enter Subject"
                required
              />
              <label htmlFor="overview">Overview</label>
              <textarea
                required
                style={{ resize: "none" }}
                name="overview"
                id="overview"
                cols="25"
                rows="7"
              ></textarea>
            </div>
            <div className="secondCol">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" required />
              <p>Import File (optional)</p>
              <label htmlFor="importFile" className="custom-file-upload">
                Choose File
              </label>
              <input type="file" id="importFile" name="importFile" />
              <label htmlFor="objectives">Objectives</label>
              <textarea
                required
                style={{ resize: "none" }}
                name="objectives"
                id="objectives"
                cols="25"
                rows="7"
              ></textarea>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="closeBtn">Generate</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
