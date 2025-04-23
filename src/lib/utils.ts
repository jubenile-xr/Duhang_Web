import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAnimalIcon = (animal: string) => {
  switch (animal) {
    case "panda":
      return "panda.png";
    case "rabbit":
      return "rabbit.png";
    case "bird":
      return "bird.png";
    case "mouse":
      return "mouse.png";
    default:
      return "panda.png";
  }
};