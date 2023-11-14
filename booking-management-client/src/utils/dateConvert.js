export function formateDate(formattedDate) {
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
