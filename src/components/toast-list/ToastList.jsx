import AppToast from "../app-toast/AppToast"
import { useSelector } from "react-redux"

import './toast-list.css'

function ToastList() {
    const toasts = useSelector(state => state.toasts)
    return (
        <div className="toasts-container">
            {
                toasts.map(toast => <AppToast key={'toast-' + toast.id} {...toast} /> )
            }
        </div>
    )
}

export default ToastList
