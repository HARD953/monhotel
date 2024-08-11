export const formatDateToYearMonthDay = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};



export function formatDateString(date) {
  const newDate = !!date ? new Date(date) : new Date();
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  // Formatter la date selon les options
  return new Intl.DateTimeFormat("fr-FR", options).format(newDate);
}


export function formatDateStringWhithoutHours(date) {
  const newDate = !!date ? new Date(date) : new Date();
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  // Formatter la date selon les options
  return new Intl.DateTimeFormat("fr-FR", options).format(newDate);
}
