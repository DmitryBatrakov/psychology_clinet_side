import { toast, ExternalToast } from "sonner";

type NotifyOptions = ExternalToast;

export const notify = {
    success: (message: string, options?: NotifyOptions) => 
        toast.success(message, {
            duration: 5000,
            position: "bottom-right",
            ...options,
        }),
    
    error: (message: string, options?: NotifyOptions) => 
        toast.error(message, {
            duration: 5000,
            position: "top-center",
            ...options,
        }),
    
    warning: (message: string, options?: NotifyOptions) => 
        toast.warning(message, {
            duration: 5000,
            position: "top-center",
            ...options,
        }),
    
    info: (message: string, options?: NotifyOptions) => 
        toast.info(message, {
            duration: 7000,
            position: "bottom-right",
            ...options,
        }),
};