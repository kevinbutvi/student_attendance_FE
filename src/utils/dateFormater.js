function dateFormatter(date) {
  let isoStartDAte = date.toISOString();
  const parts = isoStartDAte.split("T")[0].split("-");
  isoStartDAte = `${parts[0]}-${parts[1]}-${parts[2]}`;
  return isoStartDAte;
}

export default dateFormatter;
