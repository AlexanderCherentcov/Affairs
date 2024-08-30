import { popup } from "./popup.js";
import { deleteTodoItem, getTodoList } from "./server.js";

const serverData = await getTodoList();

export function deleteUser(id, task, taskText) {
  let resultDelete = false;
  const popupDelete = popup("#delete-popup");
  const deleteText = document.querySelector("#popup-delete");
  const menuItem = document.querySelectorAll(".menu__item");

  deleteText.textContent = `Вы действительно хотите удалить "${taskText}"?`;
  document.querySelector("#btnYes").addEventListener("click", () => {
    task.remove();
    popupDelete.classList.remove("open");
    deleteTodoItem(id);
    resultDelete = true;
    for (const item of menuItem) {
      if (id === item.id) {
        item.remove();
      }
    }
  });
  document.querySelector("#btnNo").addEventListener("click", () => {
    popupDelete.classList.remove("open");
    resultDelete = false;
  });
  return resultDelete;
}
