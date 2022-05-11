const fileSizeUnits = ["Б", "КБ", "МБ", "ГБ", "ТБ", "ПБ", "ЭБ", "ЗБ", "ИБ"];
export function formatFileSize(fileSize) {
  if (fileSize === 0) return "0 Б";
  const i = parseInt(Math.floor(Math.log(fileSize) / Math.log(1024)), 10);
  return (fileSize / Math.pow(1024, i)).toFixed(1) + " " + fileSizeUnits[i];
}
