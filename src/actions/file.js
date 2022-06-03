import axios from "../plugins/axios";
import {
  setFile,
  addFile,
  removeFile,
  setPublicFiles,
  changeFilePublic,
} from "../reducers/file";
import {
  showUploader,
  addUploadFile,
  changeUploadFile,
  removeUploadFile,
} from "../reducers/upload";
import { toast } from "../actions/toast";

export function getFiles(dirId, sort = "", search = "") {
  return async (dispatch) => {
    try {
      const { data: response } = await axios.get("/files", {
        params: {
          parent: dirId || "",
          sort: sort,
          search: search,
        },
      });
      dispatch(setFile(response));
    } catch (err) {
      console.log(err);
    }
  };
}

export function getPublicFiles(dirId, sort = "", search = "") {
  return async (dispatch) => {
    try {
      const { data: response } = await axios.get("/files/public", {
        params: {
          parent: dirId || "",
          sort: sort,
          search: search,
        },
      });
      dispatch(setPublicFiles(response));
    } catch (error) {
      console.error(error);
    }
  };
}

export function createDir(parentId, name) {
  return async (dispatch) => {
    try {
      const { data: response } = await axios.post("/files", {
        name,
        type: "dir",
        parent: parentId,
      });
      dispatch(addFile(response));
    } catch (err) {
      console.log(err);
    }
  };
}
export function uploadFile(file, dirId) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      await formData.append("file", file);
      dirId && formData.append("parent", dirId);
      const uploadFile = { name: file.name, progress: 0, id: Date.now() };
      dispatch(showUploader());
      dispatch(addUploadFile(uploadFile));
      const { data: response } = await axios.post("/files/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader("content-length") ||
              progressEvent.target.getResponseHeader(
                "x-decompressed-content-length"
              );
          if (totalLength) {
            uploadFile.progress = Math.round(
              (progressEvent.loaded * 100) / totalLength
            );
            dispatch(changeUploadFile(uploadFile));
            if (uploadFile.progress === 100) {
              dispatch(removeUploadFile(uploadFile.id));
            }
          }
        },
      });
      dispatch(addFile(response));
    } catch (err) {
      console.log(err);
    }
  };
}

export async function downloadFile(file) {
  const response = await axios.get(`/files/download`, {
    params: {
      id: file._id,
    },
    responseType: "blob",
  });

  if (response?.status === 200) {
    const blob = await new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const downloadUrl = await window.URL.createObjectURL(blob);
    const linkEl = document.createElement("a");
    linkEl.setAttribute("href", downloadUrl);
    linkEl.setAttribute("download", file.name);
    document.body.appendChild(linkEl);
    linkEl.click();
    linkEl.remove();
  }
}

export function deleteFile(fileId) {
  return async (dispatch) => {
    try {
      const { data: response } = await axios.delete(`/files?id=${fileId}`);
      console.dir(response);
      if (!response.error) {
        await dispatch(removeFile(fileId));
        toast(
          {
            title: "Success!",
            subTitle: "File deleted successfully!",
            type: "success",
          },
          dispatch
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function toggleFilePublic(fileId, isPublic) {
  return async (dispath) => {
    try {
      await axios.put("/files", {
        id: fileId,
      });
      dispath(changeFilePublic(fileId, isPublic));
    } catch (error) {
      console.error(error);
    }
  };
}
