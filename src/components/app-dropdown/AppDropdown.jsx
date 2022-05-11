import { lazy } from "react";
import "./app-dropdown.css";

function AppDropdown({ children, title, side }) {
  const AppIcons = lazy(() => import("../AppIcons"));
  const clickHandler = (e) => {
    e.stopPropagation();
  };
  return (
    <label className="dropdown" onClick={clickHandler}>
      <div className="dd-button" data-no-title={!title}>
        {title || <AppIcons icon="DotsVerticalIcon" size="24" />}
      </div>
      <input type="checkbox" className="dd-input" id="test" />
      <ul className="dd-menu" data-side={side || "left"}>
        {children.map((child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
    </label>
  );
}

export default AppDropdown;
