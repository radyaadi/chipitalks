import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

export function formatDate(dateString: string): string {
  const givenDate: Date = new Date(dateString);
  const currentDate: Date = new Date();
  const elapsedMilliseconds: number =
    currentDate.getTime() - givenDate.getTime();
  const elapsedSeconds: number = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes: number = Math.floor(elapsedSeconds / 60);
  const elapsedHours: number = Math.floor(elapsedMinutes / 60);
  const elapsedDays: number = Math.floor(elapsedHours / 24);
  const elapsedWeeks: number = Math.floor(elapsedDays / 7);
  const elapsedMonths: number = Math.floor(elapsedDays / 30);
  const elapsedYears: number = Math.floor(elapsedDays / 365);

  if (elapsedSeconds < 60) {
    return `${elapsedSeconds}s`;
  } else if (elapsedMinutes < 60) {
    return `${elapsedMinutes}min`;
  } else if (elapsedHours < 24) {
    return `${elapsedHours}h`;
  } else if (elapsedDays < 7) {
    return `${elapsedDays}d`;
  } else if (elapsedWeeks < 4) {
    return `${elapsedWeeks}w`;
  } else if (elapsedMonths < 12) {
    return `${elapsedMonths}mon`;
  } else {
    return `${elapsedYears}y`;
  }
}

export function formatThreadCount(count: number): string {
  if (count === 0) {
    return "No Threads";
  } else {
    const threadCount = count.toString().padStart(2, "0");
    const threadWord = count === 1 ? "Thread" : "Threads";
    return `${threadCount} ${threadWord}`;
  }
}
