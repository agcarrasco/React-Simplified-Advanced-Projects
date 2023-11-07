import { useEffect } from "react";
import { createPortal } from "react-dom";

export const CustomModal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return createPortal(
    <div className={`modal-overlay ${isOpen ? "show" : ""}`}>
      <div className="modal">{children}</div>
    </div>,
    document.querySelector("#modal-container")
  );
};
