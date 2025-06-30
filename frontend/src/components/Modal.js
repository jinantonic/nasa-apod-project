import "./Modal.css";

function Modal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null; // Do not render modal if not open

  // Overlay that covers the screen and closes modal on click outside content
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}
      >
        <h2 id="modal-title">{title}</h2>
        <p>{message}</p>
        <button type="button" onClick={onClose} aria-label="Close modal">Close</button>
      </div>
    </div>
  );
}

export default Modal;
