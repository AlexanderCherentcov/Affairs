import { validation } from "./validate.js";
import { renderMenuList } from "./render.js";
import { createTodoItem, response } from "./server.js";
import { listClient, localUsers } from "../app.js";
import { preloaderSvg } from "./svg.js";
import { popupAnswer } from "./popup.js";
import { saveLocalStorage } from "./localStorage.js";

const preloader = preloaderSvg("btn-preloader", "btn-preloader-svg");

export function addUsers(result) {
  const form = document.querySelector("#form-users");
  const inpName = document.querySelector("#inp-name");
  const inpTask = document.querySelector("#inp-task");
  const btn = document.querySelector("#btn-add");

  if (result === false) {
    const arrOwner = [];

    listClient.forEach((userOwner) => {
      arrOwner.push(userOwner.owner);
    });

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (validation(this, arrOwner) === true) {
        let newObjUser = {
          name: inpTask.value,
          owner: inpName.value,
        };
        await createTodoItem(newObjUser);
        listClient.push(newObjUser);
        inpTask.value = "";
        inpName.value = "";
        inpTask.disabled = true;
        inpName.disabled = true;

        btn.textContent = "";
        btn.append(preloader);

        setTimeout(() => {
          if (response.status !== 200) {
            popupAnswer("#addUsers-popup", "#popup-answer", "#true-popup", "Ошибка повторите попытку позже!");
          } else {
            popupAnswer("#addUsers-popup", "#popup-answer", "#true-popup", "Пользователь успешно добавлен!");
          }
        }, 1500);
      }

      setTimeout(() => {
        btn.textContent = "Добавить";
        inpTask.disabled = false;
        inpName.disabled = false;
      }, 1500);
      renderMenuList(listClient, result);
    });
  } else {
    const arrOwner = [];

    localUsers.forEach((userOwner) => {
      arrOwner.push(userOwner.owner);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validation(this, arrOwner) === true) {
        let newObjUser = {
          name: [{ task: inpTask.value, done: false}],
          owner: inpName.value,
          id: Math.random(),
        };

        localUsers.push(newObjUser);

        saveLocalStorage("localUsers", localUsers);
        inpTask.value = "";
        inpName.value = "";
        inpTask.disabled = true;
        inpName.disabled = true;

        btn.textContent = "";
        btn.append(preloader);

        setTimeout(() => {
          if (newObjUser == "") {
            popupAnswer("#addUsers-popup", "#popup-answer", "#true-popup", "Ошибка повторите попытку позже!");
          } else {
            popupAnswer("#addUsers-popup", "#popup-answer", "#true-popup", "Пользователь успешно добавлен!");
          }
        }, 1500);
      }

      setTimeout(() => {
        btn.textContent = "Добавить";
        inpTask.disabled = false;
        inpName.disabled = false;
      }, 1500);
      renderMenuList(localUsers);
    });
  }
}
