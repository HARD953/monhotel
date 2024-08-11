import { main_app_path_files } from "@/api/axiosInstance";

export const customizeImageSrc= (url)=>{
    return`${main_app_path_files}${url}`;
}


export const formatNumberFCFA = (number) => {
  return new Intl.NumberFormat("fr-FR").format(number);
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

// Calculer la notation
export const calculateRating = ({
  note_proprete = 1,
  note_service_clien = 1,
  note_confort = 1,
  note_localisation = 1,
  note_valeur_argent = 1,
  note_securite = 1,
}) => {
  const noteSomme =
    Number(note_proprete) +
    Number(note_service_clien) +
    Number(note_confort) +
    Number(note_localisation) +
    Number(note_valeur_argent) +
    Number(note_securite);

    const ratingValue = noteSomme / 6;
  const floatSum = parseFloat(ratingValue).toFixed(1);
  return floatSum;
};
