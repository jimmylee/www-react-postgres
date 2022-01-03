export const isEmpty = (string: any) => {
  return !string || !string.toString().trim();
};

export const pluralize = (text, count) => {
  return count > 1 || count === 0 ? `${text}s` : text;
};

export const getDomainFromEmail = (email: string): string => {
  return email.replace(/.*@/, "");
};

export const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.substring(1);
};

export const elide = (text, length = 140, emptyState = "...") => {
  if (isEmpty(text)) {
    return emptyState;
  }

  if (text.length < length) {
    return text.trim();
  }

  return `${text.substring(0, length)}...`;
};

export const toDate = (data) => {
  const date = new Date(data);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};

export const toDateISO = (data: string): string => {
  const date = new Date(data);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const bytesToSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(dm)} ${sizes[i]}`;
};
