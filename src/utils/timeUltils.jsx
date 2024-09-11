// Utility function to format milliseconds to MM:SS
const formatTimeForPlayingBar = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const formatDuration = (durationMs) => {
  const totalSeconds = Math.floor(durationMs / 1000); // Convert milliseconds to seconds
  const minutes = Math.floor(totalSeconds / 60); // Get the minutes
  const seconds = totalSeconds % 60; // Get the remaining seconds

  // Format seconds to always show two digits (e.g., 09 instead of 9)
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
};
export { formatTimeForPlayingBar, formatDuration };
