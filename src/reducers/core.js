const SET_FILES_CURRENT_VIEW = 'SET_FILES_CURRENT_VIEW';

const defaultState = {
  filesCurrentView: 'list'
}

export default function coreReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILES_CURRENT_VIEW:
      return {
        ...state,
        filesCurrentView: action.payload
      }
    default:
      return state

  }
}

export const setFilesCurrentView = (payload) => ({ type: SET_FILES_CURRENT_VIEW, payload: payload})