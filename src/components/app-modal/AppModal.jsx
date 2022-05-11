
import "./app-modal.css";
export default function AppModal({ value, setValue, children }) {
  function closeModal() {
    setValue(false)
  }

  return (
    <div className={`modal-container ${value && 'active'}`} onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()} className={`modal-content ${value && 'active'}`}>
        { children }
      </div>
    </div>
  );
}
