import "../styles/Modal.css";

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Add New Lesson Plan</div>
        </div>
        <div className="modal-body">
          <div className="firstCol">
            <p></p>
          </div>
        </div>
        <div className="modal-footer">
          <div className="closeBtns">
            <button className="closeBtn">Generate</button>
            <button className="closeBtn" onClick={props.onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
