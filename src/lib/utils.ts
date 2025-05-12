import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAnimalIcon = (animal: string) => {
  switch (animal) {
    case "panda":
      return "icon/panda.png";
    case "rabbit":
      return "/icon/rabbit.png";
    case "bird":
      return "/icon/bird.png";
    case "mouse":
      return "/icon/mouse.png";
    default:
      return "/icon/panda.png";
  }
};

export const getS3Url = (path: string) =>{
  return `https://pandator-assets.s3.ap-northeast-3.amazonaws.com${path}`;
}