export interface ToastProps {
    title: string;
    message: string;
    onClose: () => void;
    delay: number; 
}