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

    const units = [
      { unit: "year", seconds: 365 * 24 * 60 * 60 },
      { unit: "month", seconds: 30 * 24 * 60 * 60 },
      { unit: "day", seconds: 24 * 60 * 60 },
      { unit: "hour", seconds: 60 * 60 },
      { unit: "minute", seconds: 60 },
      { unit: "second", seconds: 1 },
    ];

    let seconds = Math.abs(secondsDifference);
    let result = [];

    for (const { unit, seconds: unitSeconds } of units) {
      const value = Math.floor(seconds / unitSeconds);
      if (value > 0) {
        result.push(`${value} ${unit}${value > 1 ? "s" : ""}`);
        seconds %= unitSeconds;
      }
      if (result.length === 2) break; // Include only the two largest units
    }

    return `${result.join(" and ")} ${isFuture ? "from now" : "ago"}`;
  };

  return { timeAgo };
}
