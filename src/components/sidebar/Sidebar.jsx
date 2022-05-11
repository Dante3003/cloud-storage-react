import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { logout } from "../../reducers/user";
import { useDispatch } from "react-redux";

export default function Sidebar(props) {
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(logout());
  }
  const links = [
    {
      to: "/",
      iconClass: "fa-folder-open",
      label: "Мои файлы",
    },
    {
      to: "/public",
      iconClass: "fa-bar-chart-o",
      label: "Публичные файлы",
    },
  ];
  return (
    <nav className="main-menu">
      <ul>
        {links.map((link, i) => (
          <li key={i}>
            <NavLink to={link.to}>
              <i className={`fa fa-2x ${link.iconClass}`}></i>
              <span className="nav-text">{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className="logout">
        <li onClick={logoutHandler}>
          <NavLink to="/auth">
            <i className="fa fa-power-off fa-2x"></i>
            <span className="nav-text">Выход</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
