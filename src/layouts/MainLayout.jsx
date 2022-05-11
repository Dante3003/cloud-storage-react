import "./main-layout.css";
import Sidebar from "../components/sidebar/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="main-content">{children}</div>
    </div>
  );
}
