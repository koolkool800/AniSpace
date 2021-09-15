export const anchorDownloadFile = (url: string) => {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = url;
  anchor.target = "_blank";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};
