import { toast } from "react-hot-toast";

export const initialFormValues = {
    id: 0,
    originalUrl: '',
    shortUrl: '',
    urlKey: '',
    clicks: 0
};

export const notifyToastInfo = (message) => {
    toast.success(message, {
        position: 'bottom-center',
        duration: 3000,
    });
}

export const notifyToastError = (message) => {
    toast.error(message, {
        position: 'bottom-center',
        duration: 3000,
    });
}

export const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    notifyToastInfo("Value copied to clipboard");
}
