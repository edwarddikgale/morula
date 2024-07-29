export function formatToDateString(date: Date, caller?: string): string {
  const dateAsString = date.toISOString().split("T")[0]
  return dateAsString;
}

export function formatToTimeString(date: Date): string {
  return date.toTimeString().substring(0, 5);
}

export const formatDateFull = (dateString: string): string => {
  const originalDate = new Date(dateString);
  const formattedDate = originalDate.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "GMT",
  });

  return formattedDate + " GMT";
};

export const extractMonthAndDate = (dateString: string, type: string): string => {
  const originalDate = new Date(dateString);
  const month = originalDate.toLocaleString("en-US", { month: "long" });
  const date = originalDate.getDate();

  if (type === "Month") {
    return `${month.slice(0, 3)}`;
  } else if (type === "Date") {
    return `${date}`;
  }
  return `${month} ${date}`;
};

export const removePTags = (text: string): string => {
  return text.replace(/<\/?p[^>]*>/g, "");
};

export const convertToISO = (dateString: string): string => {
  console.log(dateString);
  const dateParts: string[] = dateString.split("-").map((part) => String(part)); // Convert parts to strings

  const date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, 1); // Using the 1st day of the month

  const isoString: string = date.toISOString();
  const isoDateString: string = isoString.slice(0, 10) + "T00:00:00.000Z"; // Adjusting time

  return isoDateString;
};

export const convertToISOString = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const isoDateString: string = date.toISOString().slice(0, 10) + "T00:00:00.000Z"; // Keeping only the date part

  return isoDateString;
};

