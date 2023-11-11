// export function formateDate(date) {
//   return new Intl.DateTimeFormat("en-US", {
//     month: "short",
//     day: "numeric",
//   }).format(new Date(date));
// }

// export function parseFormattedDate(formattedDate) {
//   const currentYear = new Date().getFullYear();
//   const dateString = `${formattedDate} ${currentYear}`;
//   const parsedDate = new Date(dateString);

//   // Check if the parsed date is valid
//   if (isNaN(parsedDate.getTime())) {
//     console.error("Invalid date format:", formattedDate);
//     return null;
//   }

//   return parsedDate.toISOString();
// }
// Add this function to your dateConvert.js file or the file where you keep utility functions

export function parseFormattedDate(formattedDate) {
  const currentYear = new Date().getFullYear();
  const dateString = `${formattedDate} ${currentYear}`;
  const parsedDate = new Date(dateString);

  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    console.error("Invalid date format:", formattedDate);
    return null;
  }

  return parsedDate.toISOString();
}
