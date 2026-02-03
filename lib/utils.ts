import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const languagesList = [
  { id: "he", label: "Hebrew" },
  { id: "ru", label: "Русский" },
  { id: "en", label: "English" },
  { id: "uk", label: "Українська" },
  { id: "ar", label: "Arabic" },
] as const;