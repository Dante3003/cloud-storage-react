import { useDispatch, useSelector } from "react-redux";
import { setCurrentDir } from "../../reducers/file";
import { useHistory } from "react-router-dom";
import { downloadFile, deleteFile, toggleFilePublic } from "../../actions/file";
import { formatFileSize } from "../../utils/parsers";

import folderIcon from "../../assets/img/folder-icon.svg";
import fileIcon from "../../assets/img/file.png";
import "./file.css";

import AppDropdown from "../app-dropdown/AppDropdown";

export default function Folder({ file }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const filesCurrentView = useSelector((state) => state.core.filesCurrentView);
  const userId = useSelector((state) => state.user.currentUser.id);
  const isFilesCurrentViewList = filesCurrentView === "list";
  const isThisUserFileOwner = file.user === userId;

  function clickHandler() {
    if (file.type === "dir") {
      dispatch(setCurrentDir(file._id));
      history.push(`/?folder=${file._id}`);
    }
  }

  function downloadHandler(e) {
    e.stopPropagation();
    downloadFile(file);
  }
  function deleteHandler(e) {
    e.stopPropagation();
    dispatch(deleteFile(file._id));
  }

  function toggleFilePublicHandler(e) {
    e.stopPropagation();
    dispatch(toggleFilePublic(file._id, !file.public));
  }

  return (
    <div
      className={`file-container ${
        isFilesCurrentViewList ? "file__container_list" : "file__container_grid"
      }`}
      onClick={clickHandler}
    >
      <div className="file-icon-container">
        <img
          className="file-icon"
          src={file?.type === "dir" ? folderIcon : fileIcon}
          alt="folder"
        />
      </div>
      <div className="file-name">{file?.name}</div>
      {isFilesCurrentViewList ? (
        <>
          <div className="file-date">{file?.date?.slice(0, 10)}</div>
          <div className="file-size">
            {file?.type === "dir" ? " " : formatFileSize(file?.size)}
          </div>
        </>
      ) : null}
      <div className="file__controllers">
        <AppDropdown side="right">
          {file.type !== "dir" && (
            <button className="btn file-controller" onClick={downloadHandler}>
              Скачать
            </button>
          )}
          {isThisUserFileOwner && (
            <button className="btn file-controller" onClick={deleteHandler}>
              Удалить
            </button>
          )}
          {isThisUserFileOwner && (
            <button
              className="btn file-controller"
              onClick={toggleFilePublicHandler}
            >
              {file.public ? "Скрыть" : "Опубликовать"}
            </button>
          )}
        </AppDropdown>
      </div>
    </div>
  );
}
