export function formatVND(value) {
  if (value === 0) {
    return "0.000"; // Special case for zero value
  }

  if (value) {
    // Split integer and decimal parts (handles values without decimals)
    const parts = value.toString().split(".");

    // Format the integer part with commas for thousands separation
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${integerPart}`;
  }
  return "";
  //return 10.000.000
}

export function formatTruncatedVND(value) {
  value = parseInt(value);

  if (value < 0) return null;

  const thousands = Math.floor(value / 1000);
  const remainder = value % 1000;

  if (remainder === 0) {
    return `${thousands}`;
  }

  const formattedRemainder = remainder.toString().slice(0, -2); // Remove trailing zero

  const result = `${thousands},${formattedRemainder}`;
  return result;
}

export function formatTruncateWithCommaVND(value) {
  value = parseInt(value);

  if (value < 0) return null;

  const thousands = Math.floor(value / 1000);
  const remainder = value % 1000;

  if (remainder === 0) {
    return `${thousands}`;
  }

  const formattedRemainder = remainder.toString().slice(0, -2); // Remove trailing zero

  const result = `${thousands},${formattedRemainder}`;
  return result;
}

export function formatDateTimeFromDateObject(value) {
  try {
    // Parse the ISOString date time into a Date object
    const date = new Date(value);
    // Extract and format date components according to your custom format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const result = `${day}/${month}/${year} ${hours}:${minutes}`;
    return result;
  } catch (error) {
    console.error("Error parsing Date object:", error);
    return null; // Return None on parsing errors
  }
}

export function formatDateTime(value) {
  try {
    // Parse the ISOString date time into a Date object
    const date = new Date(value);

    // Extract and format date components according to your custom format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const result = `${day}/${month}/${year} ${hours}:${minutes}`;
    return result;
  } catch (error) {
    console.error("Error parsing ISOString date:", error);
    return null; // Return None on parsing errors
  }
}

export function getTime(value) {
  try {
    // Parse the ISOString date time into a Date object
    const date = new Date(value);

    // Extract and format date components according to your custom format
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const result = `${hours}:${minutes}`;
    return result;
  } catch (error) {
    console.error("Error parsing ISOString date:", error);
    return null; // Return None on parsing errors
  }
}
