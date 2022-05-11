import { ADD_TOAST, REMOVE_TOAST } from "../utils/constants/toast";

export const addToast = (toast) => ({ type: ADD_TOAST, payload: toast });
export const removeToast = (toastId) => ({ type: REMOVE_TOAST, payload: toastId });