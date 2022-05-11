import { useDispatch } from "react-redux";
import { uploadFile } from "../../actions/file";

import "./upload-file.css";

function UploadFile() {
  const dispatch = useDispatch();
  function fileUploadHandler(e) {
    const files = [...e.target.files];
    files.forEach((file) => dispatch(uploadFile(file)));
    uploadFile();
  }
  return (
    <label htmlFor="file-upload-input" className="btn upload-file-button">
      <span>Загрузить файл</span>
      <input
        onChange={fileUploadHandler}
        hidden
        multiple
        type="file"
        id="file-upload-input"
      />
    </label>
  );
}

export default UploadFile;
