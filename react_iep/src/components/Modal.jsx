import { useState, useEffect } from "react";
import { CgCloseR } from "react-icons/cg";
import "../styles/Modal.css";

const Modal = (props) => {
  const [lesson, setLesson] = useState();
  const [subject, setSubject] = useState();
  const [date, setDate] = useState();
  const [overview, setOverview] = useState();
  const [objectives, setObjectives] = useState();
  const [formObj, setFormObj] = useState();

  useEffect(() => {
    console.log(formObj);
    if (formObj !== undefined) {
      window.localStorage.setItem("formData", JSON.stringify(formObj));
      props.onSubmit();
    }
  }, [formObj]);

  if (!props.show) {
    return null;
  }

  const handleChange = (event) => {
    switch (event.target.name) {
      case "lessonPlanTitle":
        setLesson(event.target.value);
        break;
      case "subjectTitle":
        setSubject(event.target.value);
        break;
      case "date":
        setDate(event.target.value);
        break;
      case "overview":
        setOverview(event.target.value);
        break;
      case "objectives":
        setObjectives(event.target.value);
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormObj({
      lessonPlan: lesson,
      subjectTitle: subject,
      date: date,
      overview: overview,
      objectives: objectives,
    });
    props.onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <CgCloseR className="close-icon" onClick={props.onClose} />
          <div className="modal-title">Add New Lesson Plan</div>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="colContainer">
              <div className="firstCol">
                <label htmlFor="lessonPlanTitle">
                  Title of Lesson Plan<span>*</span>
                </label>
                <input
                  className="input"
                  type="text"
                  id="lessonPlanTitle"
                  name="lessonPlanTitle"
                  placeholder="Enter Name"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="subjectTitle">
                  Subject<span>*</span>
                </label>
                <input
                  className="input"
                  type="text"
                  id="subjectTitle"
                  name="subjectTitle"
                  placeholder="Enter Subject"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="overview">
                  Overview<span>*</span>
                </label>
                <textarea
                  placeholder="Enter Overview"
                  required
                  style={{ resize: "none" }}
                  name="overview"
                  id="overview"
                  cols="25"
                  rows="7"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="secondCol">
                <label htmlFor="date">
                  Date<span>*</span>
                </label>
                <input
                  className="input"
                  type="date"
                  id="date"
                  name="date"
                  required
                  onChange={handleChange}
                />
                <div className="fileImportContainer">
                  <label htmlFor="importFile" className="custom-file-upload">
                    Import File (optional)
                  </label>
                  <input type="file" id="importFile" name="importFile" />
                </div>
                <label htmlFor="objectives">
                  Objectives<span>*</span>
                </label>
                <textarea
                  placeholder="Enter Objectives"
                  required
                  style={{ resize: "none" }}
                  name="objectives"
                  id="objectives"
                  cols="25"
                  rows="7"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <button type="submit" className="closeBtn">
              Generate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
