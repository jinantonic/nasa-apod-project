import React from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    // Overlay that covers the screen and closes modal on click outside content
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1} // Allow focus to be managed for accessibility
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside content
        tabIndex={0}
      >
        <h2 id="modal-title">{title}</h2>
        <p>{message}</p>
        <button type="button" onClick={onClose} aria-label="Close modal">OK</button>
      </div>
    </div>
  );
}

export default Modal;
