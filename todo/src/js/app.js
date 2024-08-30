import { renderDate } from "./components/renderDate.js";
import { addUsers } from "./components/addUsers.js";
import { popup } from "./components/popup.js";
import { menuUsers, renderMenuList } from "./components/render.js";
import { extractionLocalStorage } from "./components/localStorage.js";
const api = await import("./components/server.js");
// import * as api from "./components/server.js";
// подключение стилей
import "../scss/style.scss";

let switchApi = false;
const btnApi = document.querySelector("#api-btn");

// Api
const serverData = await api.getTodoList();
export let listClient = [];
if (serverData !== null) {
  listClient = serverData;
}

// localStorage
export let localUsers = extractionLocalStorage("localUsers");

btnApi.addEventListener("click", () => {
  if (switchApi === false) {
    switchApi = true;
    btnApi.textContent = "localStorage";
    addUsers(true);
    renderMenuList(localUsers, true);
  } else {
    switchApi = false;
    btnApi.textContent = "Api";
    addUsers(false);
    renderMenuList(listClient, false);
  }
});

const container = document.querySelector("#user-app");
container.classList.add("no-task");

// Отрисовка даты и времени
renderDate("#time-block");

// Вызова popup c формой добавление нового пользователя
document.querySelector("#addUsers").addEventListener("click", () => {
  popup("#addUsers-popup");
});
// Меню с пользователями
menuUsers();

if (switchApi === false) {
  btnApi.textContent = "Api";
  // Отрисовка списка пользователей в меню
  renderMenuList(listClient, false);
  addUsers(false);
} else {
  renderMenuList(localUsers, true);
  addUsers(true);
}
