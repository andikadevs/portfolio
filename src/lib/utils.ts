import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @author Andika Dwi Saputra
 * 
 * @date 30/03/2025
 * @description Utility function to merge class names
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
