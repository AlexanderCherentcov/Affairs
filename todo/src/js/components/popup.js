// Создаем popup

export function popup(idPopup) {
  const popup = document.querySelector(idPopup);

  popup.classList.add("open");

  // Закрытия popup
  const closePopup = () => {
    popup.classList.remove("open");
  };

  if (popup.classList.contains("open")) {
    const closedPopup = document.querySelectorAll("[data-close]")
    for (const close of closedPopup) {
      close.addEventListener("click", () => {
        closePopup();
      });
    }
    
  

    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        closePopup();
      }
    });
  }

  return popup;
}

export function popupAnswer(idOpen, idText, idAnswer, text) {
  const popupOpen = document.querySelector(idOpen);
  const textAnswer = document.querySelector(idText);
  const answer = popup(idAnswer);
  if (popupOpen.classList.contains("open")) {
    popupOpen.classList.remove("open");
  }
  answer.classList.add("open");
  textAnswer.textContent = text;
  setTimeout(() => {
    answer.classList.remove("open");
  }, 1500);
}
