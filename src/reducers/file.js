const SET_FILE = "SET_FILE";
const SET_PUBLIC_FILES = "SET_PUBLIC_FILES";
const CHANGE_FILE_PUBLIC = "CHANGE_FILE_PUBLIC";
const SET_CURRENT_DIR = "SET_CURRENT_DIR";
const ADD_FILE = "ADD_FILE";
const DELETE_FILE = "DELETE_FILE";

const defaultState = {
  files: [],
  currentDir: "",
  publicFiles: [],
};

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILE:
      return {
        ...state,
        files: action.payload,
      };
    case SET_PUBLIC_FILES:
      return {
        ...state,
        publicFiles: action.payload,
      };
    case CHANGE_FILE_PUBLIC:
      return {
        ...state,
        files: state.files.map((file) => {
          if (file.id === action.payload.fileId) {
            file.public = action.payload.public;
          }
          return file;
        }),
      };
    case SET_CURRENT_DIR:
      return {
        ...state,
        currentDir: action.payload,
      };
    case ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload],
      };
    case DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter((file) => file._id !== action.payload)],
      };
    default: {
      return state;
    }
  }
}

export const setFile = (payload) => ({ type: SET_FILE, payload: payload });
export const setPublicFiles = (payload) => ({
  type: SET_PUBLIC_FILES,
  payload: payload,
});
export const changeFilePublic = (payload) => ({
  type: CHANGE_FILE_PUBLIC,
  payload: payload,
});
export const setCurrentDir = (payload) => ({
  type: SET_CURRENT_DIR,
  payload: payload,
});
export const addFile = (payload) => ({ type: ADD_FILE, payload: payload });
export const removeFile = (fileId) => ({ type: DELETE_FILE, payload: fileId });
