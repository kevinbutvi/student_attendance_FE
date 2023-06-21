function dateFormatter(date) {
  let isoDAte = date.toISOString();
  const parts = isoDAte.split("T")[0].split("-");
  isoDAte = `${parts[0]}-${parts[1]}-${parts[2]}`;
  return isoDAte;
}

function dateFormatterForUI(date) {
  let isoDAte = date.toISOString();
  const parts = isoDAte.split("T")[0].split("-");
  isoDAte = `${parts[1]}-${parts[2]}-${parts[0]}`;
  return isoDAte;
}

export { dateFormatter, dateFormatterForUI };
