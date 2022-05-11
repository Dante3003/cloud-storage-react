import { ADD_TOAST, REMOVE_TOAST } from '../utils/constants/toast';
const initialState = [];

export default function toastReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TOAST:
            return createToast(state, action.payload);
        case REMOVE_TOAST:
            return removeToast(state, action.payload);
        default:
            return state;
    }
}

const createToast = (state, toast) => {
    return [
        ...state,
        toast
    ]
};
const removeToast = (state, payload) => {
    return [
        ...state.filter(item => item.id !== payload)
    ]
}