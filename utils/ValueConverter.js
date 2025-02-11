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
    console.error(
      "Error converting date string to ISOString in dateStringToISOString:",
      error
    );
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
    console.error(
      "Error converting datetime string to ISOString in dateTimeStringToISOString:",
      error
    );
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
    console.error("Error parsing ISOString date in isoStringToTime:", error);
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
    console.error("Error parsing Date object in isoStringToDateTime:", error);
    return null; // Return None on parsing errors
  }
}

//date object to date time format
export function dateObjectToDateTime(date, hour, minute) {
  try {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0"); //Adjust the params to use the date object's time
    const minutes = String(date.getMinutes()).padStart(2, "0"); //Adjust the params to use the date object's time

    return `${hour}:${minute} - ${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error parsing Date object in dateObjectToDateTime:", error);
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
    console.error("Error parsing Date object in isoStringToDate:", error);
    return null; // Return None on parsing errors
  }
}

export function isoStringToTruncatedDate(value) {
  // 2021-09-01T00:00:00.000Z to 21 thg 9, 2021
  try {
    // Parse the ISOString date time into a Date object
    const date = new Date(value);
    // Extract and format date components according to your custom format
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0");

    const result = `${day} thg ${month}`;
    return result;
  } catch (error) {
    console.error(
      "Error parsing Date object in isoStringToTruncatedDate:",
      error
    );
    return null; // Return None on parsing errors
  }
}

export function isoStringToFullDateTime(value) { // Parse the ISOString date time into a fully date time string
  try {
    const date = new Date(value);

    // Vietnamese days of week
    const daysOfWeek = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${dayOfWeek}, ngày ${day} tháng ${month} năm ${year} (${hours}:${minutes})`;
  } catch (error) {
    console.error(
      "Error parsing Date object in isoStringToFullDateTime:",
      error
    );
    return null;
  }
}

export function dateObjectToFullDateTime(date, hour, minute) { //Parse the Date time object into a fully date time string
  try {
    // Vietnamese days of week
    const daysOfWeek = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0"); //replace the params with this if wanna use the date object's time

    return `${dayOfWeek}, ngày ${day} tháng ${month} năm ${year} (${hour}:${minute})`;
  } catch (error) {
    console.error(
      "Error parsing Date object in dateObjectToFullDateTime:",
      error
    );
    return null;
  }
}

export function dateObjectToDateString(date) {
  try {
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error converting date in dateObjectToDateString:", error);
    return null;
  }
}

export function dateStringToTruncatedDate(dateStr) {
  try {
    const [year, month, day] = dateStr.split("-");
    return `${day} thg ${month}`;
  } catch (error) {
    console.error(
      "Error parsing date string in dateStringToTruncatedDate:",
      error
    );
    return null;
  }
}

export function dateObjectToTruncatedDate(date) {
  try {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day} thg ${month}`;
  } catch (error) {
    console.error("Error converting date in dateObjectToTruncatedDate:", error);
    return null;
  }
}

export function isoStringToDateString(isoString) {
  try {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error converting date in isoStringToDateString:", error);
    return null;
  }
}

export const dateObjectToVNTimeISOString = (date) => { //use this if the date time is earlier than the current time by 7 hours
  const vnDate = new Date(date);
  vnDate.setHours(vnDate.getHours() + 7);
  return vnDate.toISOString();
};

export function isoStringToTruncatedSearchDate(value) {
  // Parse the ISOString date time into a truncated recent search date string (this is used for the recent search history)
  try {
    const date = new Date(value);

    // Vietnamese days of week
    const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${dayOfWeek}, ${day}/${month}/${year}`;
  } catch (error) {
    console.error(
      "Error parsing Date object in isoStringToFullDateTime:",
      error
    );
    return null;
  }
}