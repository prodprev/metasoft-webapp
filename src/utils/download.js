export default function(url) {
  if (!url) return;

  const link = document.createElement("a");
  link.href = url;
  link.click();
}
