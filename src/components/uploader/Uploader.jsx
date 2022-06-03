import React from "react";
import UploadFile from "./UploaderFile";
import "./uploader.css";
import { useSelector, useDispatch } from "react-redux";
import { hideUploader } from "../../reducers/upload";
import AppIcons from "../AppIcons";

function Uploader() {
  const isVisible = useSelector((state) => state.upload.isVisible);
  const files = useSelector((state) => state.upload.files);
  const dispatch = useDispatch();
  const closeHandler = () => dispatch(hideUploader());
  return isVisible ? (
    <div className="upload-status">
      <button className="btn uploader-close" onClick={closeHandler}>
        <AppIcons icon="XIcon" />
      </button>
      <h1>Загрузка файла</h1>
      {files.map((file) => (
        <UploadFile key={file.id} file={file} />
      ))}
    </div>
  ) : null;
}

export default Uploader;
