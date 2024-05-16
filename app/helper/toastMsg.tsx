import { toast } from "react-toastify";

export const successToast = (message:string) => {
    toast.success(message, {
        toastId: 'successToast',
        position: toast.POSITION.TOP_RIGHT       
    });
}

export const errorToast = (message:string) => {
    toast.error(message, {
        toastId: 'errorToast',
        position: toast.POSITION.TOP_RIGHT
    });
}

export const infoToast = (message:string) => {
    toast.info(message, {
        toastId: 'infoToast',
        position: toast.POSITION.TOP_CENTER
    })
}