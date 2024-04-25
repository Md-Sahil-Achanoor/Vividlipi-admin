export const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  // alignItems: 'center',
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  borderWidth: 1.5,
  borderColor: "gray",
  borderStyle: "dashed",
  backgroundColor: "#EEF2FF",
  color: "black",
  // cursor: 'pointer',
  outline: "none",
  transition: "border .24s ease-in-out",
};

export const activeStyle = {
  borderColor: "#2196f3",
};

export const acceptStyle = {
  borderColor: "#00e676",
};

export const rejectStyle = {
  borderColor: "#ff1744",
};

/**
 * Formats the size
 */
export function formatBytes(bytes: any, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
