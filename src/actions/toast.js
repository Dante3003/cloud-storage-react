import {
    addToast,
    removeToast,
} from '../actions-creators/toast';


export const toast = async (payload, dispatch) => {
    await dispatch(addToast(payload));
    setTimeout(() => {
        dispatch(removeToast(payload));
    }, payload.duration || 3000);
}