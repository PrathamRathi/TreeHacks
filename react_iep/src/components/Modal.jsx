import "../styles/Modal.css";

const Modal = () => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            <div className="modal-body">This is modal content</div>
            <div className="modal-footer">
              <button className="button">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
