//--------------------------CURRENCY FORMATTER----------------------------------
export function formatVND(value) {
  // 10000000 to 10.000.000
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

//--------------------------TIME CONVERTER----------------------------------
export function dateStringToISOString(dateString) { //convert "yyyy-mm-dd" to "yyyy-mm-ddT00:00:00.000Z"
  try {
    // Create a new Date object using the date string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // Return the ISO string representation of the date
    return date.toISOString();
  } catch (error) {
    console.error("Error converting date string to ISOString:", error);
    return null; // Return null on errors
  }
}

export function dateTimeStringToISOString(dateTimeString) { //convert "yyyy-mm-ddThh:mm" to "yyyy-mm-ddThh:mm:00.000Z"
  try {
    // Split date and time parts
    const [datePart, timePart] = dateTimeString.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);

    // Create date in UTC
    const date = new Date(Date.UTC(year, month - 1, day, hours, minutes));

    // Check if date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    return date.toISOString();
  } catch (error) {
    console.error("Error converting datetime string to ISOString:", error);
    return null;
  }
}

export function isoStringToTime(value) {
  // 2021-09-01T00:00:00.000Z to 00:00
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

export function isoStringToDateTime(value) {
  // 2021-09-01T00:00:00.000Z to 01/09/2021 00:00
  try {
    // Parse the ISOString date time into a Date object
    const date = new Date(value);
    // Extract and format date components according to your custom format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const result = `${hours}:${minutes} - ${day}/${month}/${year}`;
    return result;
  } catch (error) {
    console.error("Error parsing Date object:", error);
    return null; // Return None on parsing errors
  }
}

export function isoStringToDate(value) {
  // 2021-09-01T00:00:00.000Z to 21 tháng 9, 2021
  try {
    // Parse the ISOString date time into a Date object
    const date = new Date(value);
    // Extract and format date components according to your custom format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0");

    const result = `${day} tháng ${month}, ${year}`;
    return result;
  } catch (error) {
    console.error("Error parsing Date object:", error);
    return null; // Return None on parsing errors
  }
}
