import React from "react";
import { formatFileSize } from "../../utils/parsers";

function UploaderFIle({ file }) {
  return (
    <div className="upload-file">
      <div className="upload-file__description">
        <div className="upload-file__name">{file.name}</div>
        <div className="upload-file__size">{formatFileSize(file.size)}</div>
      </div>
      <div className="status">
        <div className="status__field">
          <div
            className="status__line"
            style={{ width: file.progress + "%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default UploaderFIle;
