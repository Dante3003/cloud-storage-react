import { useSelector, useDispatch } from "react-redux";
import { setFilesCurrentView } from "../../reducers/core";

import "./header.css";
import AppDropdown from "../app-dropdown/AppDropdown";
import CreateDir from "../create-dir/CreateDir";
import UploadFile from "../upload-file/UploadFile";
import AppIcons from "../AppIcons";

export default function Header({ sort, search, isPublicPage }) {
  const currentFilesView = useSelector((state) => state.core.filesCurrentView);
  const dispatch = useDispatch();

  function handleCurrentFilesViewUpdate() {
    const filesView = currentFilesView === "list" ? "grid" : "list";
    dispatch(setFilesCurrentView(filesView));
  }

  return (
    <div className="class-wrapper">
      <input
        className="input header__search"
        type="text"
        placeholder="Поиск файлов"
        value={search.value}
        onInput={search.handler}
      />
      <div className="header__controllers">
        <select
          className="header__sort"
          value={sort.value}
          onChange={sort.handler}
        >
          <option value="name">По имени</option>
          <option value="type">По типу</option>
        </select>
        {!isPublicPage ? (
          <AppDropdown title="Добавить файл">
            <CreateDir />
            <UploadFile />
          </AppDropdown>
        ) : null}
        <div>
          <button
            onClick={handleCurrentFilesViewUpdate}
            className="btn folder-view__btn"
          >
            {currentFilesView === "list" ? (
              <AppIcons icon="ViewListIcon" />
            ) : (
              <AppIcons icon="ViewGridIcon" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
