import { useDispatch } from "react-redux";

import "./app-toast.css";
import { removeToast } from "../../actions-creators/toast";
import AppIcons from "../AppIcons";

function AppToast({ id, title, subTitle, type }) {
  const dispatch = useDispatch();
  function deleteHandler() {
    dispatch(removeToast(id));
  }
  const toastIcons = {
    success: "CheckCircleIcon",
    error: "ExclamationCircleIcon",
    warning: "ExclamationIcon",
    info: "InformationIcon",
  };
  const toastIcon = toastIcons[type] || "InformationIcon";
  return (
    <div className={`toast ${type}`}>
      <div className="outer-container">
        {" "}
        <AppIcons icon={toastIcon} size="28" />
      </div>
      <div className="inner-container">
        <p className="toast-title">{title}</p>
        <p className="toast-subtitle">{subTitle}</p>
      </div>
      <button onClick={deleteHandler}>&times;</button>
    </div>
  );
}

export default AppToast;
