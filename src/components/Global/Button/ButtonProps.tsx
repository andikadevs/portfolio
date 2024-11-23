import { ReactNode, MouseEvent } from "react";

export interface ButtonProps {
    onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    children: ReactNode;
    disabled?: boolean;
    variant?: 'outline' | 'fill' | 'disabled';
    size?: 'md' | 'sm';
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}