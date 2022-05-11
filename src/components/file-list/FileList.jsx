import { useSelector } from "react-redux";

import "./file-list.css";
import File from "../file/File";

function fileListHeader() {
  return (
    <div className="file-list__header">
      <div className="file-name">Название</div>
      <div className="file-date">Дата</div>
      <div className="file-size">Размер</div>
    </div>
  );
}

const FileListContainer = (fileList, isFilesCurrentViewList) => (
  <div className="file-list">
    {isFilesCurrentViewList && fileListHeader()}
    <div
      className={`files-container ${isFilesCurrentViewList ? "list" : "grid"}`}
    >
      {fileList}
    </div>
  </div>
);

const emptyFolder = () => <div className="file-list__empty">Папка пуста</div>;

export default function FileList({ filesPath }) {
  const files = useSelector((state) => state.files[filesPath || "files"]);
  const filesCurrentView = useSelector((state) => state.core.filesCurrentView);
  const isFilesCurrentViewList = filesCurrentView === "list";
  let fileList = null;

  if (files) {
    fileList = files.map((file) => <File key={file?._id} file={file} />);
  }

  return (
    <div>
      {fileList.length
        ? FileListContainer(fileList, isFilesCurrentViewList)
        : emptyFolder()}
    </div>
  );
}
