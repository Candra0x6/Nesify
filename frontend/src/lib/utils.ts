import { clsx, type ClassValue } from "clsx";
import { BigNumber, ethers } from "ethers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: number | Date) {
  const oldDate = new Date(date);
  const newDate =
    oldDate.getFullYear() +
    "/" +
    (oldDate.getMonth() + 1) +
    "/" +
    oldDate.getDate() +
    ", 23:59:59";
  return new Date(newDate);
}
export function formatDate2(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function convertBigNumber(value: BigNumber) {
  if (!value) return "0";
  const fullNumber = ethers.utils.formatEther(value);
  const parsed = parseFloat(fullNumber);
  // Set a minimum threshold
  return parsed < 0.0001 ? "0" : parsed.toFixed(4);
}
