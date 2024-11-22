export function useTimeAgo() {
  /**
   * Converts a Unix timestamp to a human-readable "time ago" or "in X time" format.
   * @param {number} timestamp - The Unix timestamp in seconds.
   * @returns {string} - A formatted string like "2 hours ago" or "in 1 day and 2 hours".
   */
  const timeAgo = (timestamp) => {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const secondsDifference = timestamp - now;
    const isFuture = secondsDifference > 0;

    const seconds = Math.abs(secondsDifference);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      const remainingMonths = months % 12;
      return `${years} year${years > 1 ? "s" : ""}${
        remainingMonths > 0
          ? ` and ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`
          : ""
      } ${isFuture ? "from now" : "ago"}`;
    }

    if (months > 0) {
      const remainingDays = days % 30;
      return `${months} month${months > 1 ? "s" : ""}${
        remainingDays > 0
          ? ` and ${remainingDays} day${remainingDays > 1 ? "s" : ""}`
          : ""
      } ${isFuture ? "from now" : "ago"}`;
    }

    if (days > 0) {
      const remainingHours = hours % 24;
      return `${days} day${days > 1 ? "s" : ""}${
        remainingHours > 0
          ? ` and ${remainingHours} hour${remainingHours > 1 ? "s" : ""}`
          : ""
      } ${isFuture ? "from now" : "ago"}`;
    }

    if (hours > 0) {
      const remainingMinutes = minutes % 60;
      return `${hours} hour${hours > 1 ? "s" : ""}${
        remainingMinutes > 0
          ? ` and ${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`
          : ""
      } ${isFuture ? "from now" : "ago"}`;
    }

    if (minutes > 0) {
      const remainingSeconds = seconds % 60;
      return `${minutes} minute${minutes > 1 ? "s" : ""}${
        remainingSeconds > 0
          ? ` and ${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`
          : ""
      } ${isFuture ? "from now" : "ago"}`;
    }

    return `${seconds} second${seconds > 1 ? "s" : ""} ${
      isFuture ? "from now" : "ago"
    }`;
  };

  return { timeAgo };
}
