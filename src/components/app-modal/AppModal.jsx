import { useRef } from "react";

import useKeydown from "../../utils/hooks/useKeydown";
import useOutsideClick from "../../utils/hooks/useOutsideClick";

import "./app-modal.css";

export default function AppModal({ value, setValue, children }) {
  useKeydown("Escape", closeModal);
  const modalRef = useRef(null);
  useOutsideClick(modalRef, closeModal);

  function closeModal() {
    setValue(false);
  }

  return (
    <div className={`modal-container ${value && "active"}`}>
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`modal-content ${value && "active"}`}
      >
        {children}
      </div>
    </div>
  );
}
