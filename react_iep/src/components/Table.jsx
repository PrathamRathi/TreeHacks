import { BarLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { RiAddFill } from "react-icons/ri";
import { BiExport } from "react-icons/bi";
import axios from "axios";
import "../styles/Table.css";
import { CgCloseR } from "react-icons/cg";
import "../styles/Modal.css";
import "../styles/DefaultTable.css";

const ENV = "http://127.0.0.1:8000/api/";
const LESSON_PLAN = ENV + "lesson-plans/";
const MODEL_PREDICT = ENV + "predict";
const LPS = ENV + "lps-accommodations/";

const TableItem = (props) => {
  const { lesson } = props;
  const [viewing, setViewing] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [isEditing, setIsEditing] = useState();
  const [accomodations, setAccomodations] = useState();

  function submitEdit(event) {
    event.preventDefault();
    console.log(lesson);
    console.log(event.target.value);
  }

  useEffect(() => {
    if (accomodations === undefined) {
      console.log({
        objective: lesson.objectives,
        overview: lesson.overview,
        subject: lesson.subject,
      });
      setIsLoading(true);
      axios
        .post(MODEL_PREDICT, {
          objective: lesson.objectives,
          overview: lesson.overview,
          subject: lesson.subject,
        })
        .then((res) => {
          console.log(res);
          lesson.notLoaded = false;
          axios
            .get(LPS)
            .then((res) => {
              setIsLoading(false);
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
          lesson.notLoaded = false;
        });
    }
  }, []);

  return (
    <div className="tableRow">
      {viewing ? (
        <div className="lessonPlan">
          <h1>{lesson.name}</h1>
          <h2>Overview</h2>
          <p>{lesson.overview}</p>
          <h2>Objectives</h2>
          <p>{lesson.objectives}</p>
          <h2>Accomodations</h2>
          {accomodations &&
            Object.entries(accomodations).map((a) => {
              if (Array.isArray(a[1])) {
                //handle multiple
              } else {
                return (
                  <>
                    <div className="editAccom">
                      <h3>{a[0]}</h3>
                      <button onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                    {isEditing ? (
                      <form onSubmit={submitEdit}>
                        <textarea placeholder={a[1]}></textarea>
                        <button type="submit">Submit</button>
                        <button onClick={() => setIsEditing(false)}>
                          Close
                        </button>
                      </form>
                    ) : (
                      <p>{a[1]}</p>
                    )}
                  </>
                );
              }
            })}

          <button className="collapseBtn" onClick={() => setViewing(false)}>
            Condense
          </button>
        </div>
      ) : (
        <>
          <div className="view">
            <h1>{lesson.name}</h1>

            {isLoading ? (
              <BarLoader width="160px" speedMultiplier={1.5} />
            ) : (
              <button className="viewBtn" onClick={() => setViewing(true)}>
                View
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Table = () => {
  const [show, setShow] = useState(false);
  const [lessons, setLessons] = useState();
  const [lesson, setLesson] = useState();
  const [subject, setSubject] = useState();
  const [date, setDate] = useState();
  const [overview, setOverview] = useState();
  const [objectives, setObjectives] = useState();

  useEffect(() => {
    getLessons();
  }, []);

  const sendData = (formData) => {
    axios.post(LESSON_PLAN, formData).then((res) => {
      axios.get(LESSON_PLAN).then((res) => {
        let preLessons = res.data;
        preLessons = preLessons.map((lesson) => ({
          ...lesson,
          notLoaded: true,
        }));
        setLessons(preLessons.reverse());
        console.log(res.data);
      });
    });
  };

  function getLessons() {
    axios.get(LESSON_PLAN).then((res) => {
      setLessons(res.data.reverse());
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setShow(false);
    const formData = {
      name: lesson,
      subject: subject,
      present_date: date,
      overview: overview,
      objectives: objectives,
    };
    console.log(formData);
    sendData(formData);
  };

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
      {show ? (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <CgCloseR className="close-icon" onClick={() => setShow(false)} />
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
                    <select
                      name="subjectTitle"
                      id="subjectTitle"
                      onChange={handleChange}
                      required
                      placeholder="Enter Subject"
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
                      <label
                        htmlFor="importFile"
                        className="custom-file-upload"
                      >
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
      ) : (
        <></>
      )}
      {lessons && lessons.length > 0 ? (
        <div className="table">
          {lessons.map((lesson) => {
            return <TableItem key={lesson.uuid} lesson={lesson} />;
          })}
        </div>
      ) : (
        <div className="table">
          <div className="tableItem">
            <p>You don't have any lesson plans! Click the&nbsp;&nbsp;</p>
            <button className="addExportBtn" onClick={() => setShow(true)}>
              <p>Add&nbsp;</p>
              <RiAddFill style={{ color: "#fff" }} />
            </button>
            <p>&nbsp;&nbsp;button to add one.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
