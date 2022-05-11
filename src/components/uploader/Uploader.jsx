import React from "react";
import UploadFile from "./UploaderFile";
import "./uploader.css";
import { useSelector, useDispatch } from "react-redux";
import { hideUploader } from "../../reducers/upload";

function Uploader() {
  const isVisible = useSelector((state) => state.upload.isVisible);
  const files = useSelector((state) => state.upload.files);
  const dispatch = useDispatch();
  const closeHandler = () => dispatch(hideUploader);
  return (
    isVisible &&
    files.length && (
      <div className="upload-status">
        <button className="btn uploader-close" onClick={closeHandler}>
          <i className="fas fa-times"></i>
        </button>
        <h1>File upload</h1>
        {files.map((file) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    )
  );
}

export default Uploader;
