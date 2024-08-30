export function renderDate(blockId) {
  const dateBlock = document.querySelector(blockId);

  setInterval(() => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    function addZero(numberDate) {
      return numberDate < 10 ? "0" + numberDate : numberDate;
    }
    dateBlock.textContent = `
   ${addZero(day)}.${addZero(month)}.${date.getFullYear()} ${addZero(hours)}:${addZero(minutes)}`;
  }, 1000);

  return dateBlock;
}
