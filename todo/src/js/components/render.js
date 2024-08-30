import { getLi, getDiv, getBtn } from "./htmlElements.js";
import { popup } from "./popup.js";
import { getTodoListId, switchTodoItemDone, deleteTodoItem } from "./server.js";
import { getUser } from "./user.js";
import { preloaderSvg } from "./svg.js";
import { localUsers } from "../app.js";
import { saveLocalStorage } from "./localStorage.js";

export function menuUsers() {
  const body = document.querySelector("body");
  const menuBtn = document.querySelector("#btn-menu");
  const menuBlock = document.querySelector("#menu-block");
  // Выпадающий список
  menuBtn.addEventListener("click", () => {
    menuBlock.classList.toggle("menu_active");
    menuBtn.classList.toggle("btn_active");
  });

  menuBtn.addEventListener("click", (e) => {
    e.isClickInBlock = true;
    menuBlock.addEventListener("click", (e) => {
      e.isClickInBlock = true;
    });
  });

  body.addEventListener("click", (e) => {
    if (e.isClickInBlock) return;
    menuBlock.classList.remove("menu_active");
    menuBtn.classList.remove("btn_active");
  });
}

export function renderMenuList(userArr, result) {
  const menuBlock = document.querySelector("#menu-block");
  const copyArr = [...userArr];
  const ownerArr = [];
  const makeUniq = (arr) => [...new Set(arr)];

  menuBlock.textContent = "";

  if (copyArr.length !== 0) {
    copyArr.forEach((user) => {
      ownerArr.push(user.owner);
    });

    for (const owner of makeUniq(ownerArr)) {
      const blockUser = document.createElement("button");
      blockUser.textContent = `${owner}`;
      blockUser.classList.add("menu__item");
      copyArr.forEach((user) => {
        blockUser.id = user.id;
      });

      blockUser.addEventListener("click", async () => {
        if (result === false) {
          const user = await getTodoListId(blockUser.textContent);
          renderUserTask(user, blockUser.textContent, result);
        } else {
          for (const user of localUsers) {
            if (user.owner === blockUser.textContent) {
              renderUserTask(user.name, blockUser.textContent, result);
            }
          }
        }

        menuBlock.classList.remove("menu_active");
      });
      menuBlock.append(blockUser);
    }
  } else {
    menuBlock.textContent = "Нет не одного пользователя!";
  }
}

export function renderUserTask(userArr, owner, result) {
  const copyArr = [...userArr];
  const preloader = preloaderSvg("btn-preloader", "btn-preloader-svg");
  const container = document.querySelector("#user-app");
  container.textContent = "";
  container.append(preloader);
  setTimeout(async () => {
    container.removeChild(preloader);
    container.classList.remove("no-task");
    const getUserBlock = getUser(owner, result);
    const taskArr = [];
    const doneArr = [];

    function renderCounter(arr, classCounter) {
      const counterCopy = [...arr];
      const blocCounter = document.querySelector(classCounter);
      blocCounter.textContent = counterCopy.length;
    }

    const ul = (await getUserBlock).ul;
    ul.classList.add("open-task");
    if (result === false) {
      copyArr.forEach((element) => {
        const userLi = getLi("list-task__item", element.id);
        const divBtn = getDiv("list-task__btns");
        const doneBtn = getBtn("item__btn", "Выполнено", "btn-done");
        doneBtn.classList.add("btn");
        const btnDelete = getBtn("item__btn", "Удалить", "btn-delete");
        btnDelete.classList.add("btn");
        divBtn.append(btnDelete, doneBtn);
        if (userLi.classList.contains("open")) {
          userLi.remove();
        }

        taskArr.push(element.name);

        // Удаление дела
        btnDelete.addEventListener("click", async () => {
          const popupDelete = popup("#delete-popup");
          const deleteText = document.querySelector("#popup-delete");

          deleteText.textContent = `Вы действительно хотите удалить "${element.name}"?`;
          document.querySelector("#btnYes").addEventListener("click", () => {
            userLi.remove();
            popupDelete.classList.remove("open");
            deleteTodoItem(element.id);
            taskArr.splice(0, 1);

            if (element.done === true) {
              doneArr.splice(0, 1);
              renderCounter(doneArr, ".done__counter");
            }
            renderCounter(taskArr, ".task__counter");
          });
          document.querySelector("#btnNo").addEventListener("click", () => {
            popupDelete.classList.remove("open");
          });
        });

        // Отметка что дело выполнено

        element.done == true ? (doneBtn.textContent = "Не выполнено") : (doneBtn.textContent = "Выполнено");
        element.done == true ? userLi.classList.add("done") : userLi.classList.remove("done");
        element.done == true ? doneArr.push("true") : doneArr.splice(0, 1);

        doneBtn.addEventListener("click", () => {
          switchTodoItemDone(element);
          if (element.done === true) {
            doneBtn.textContent = "Не выполнено";
            userLi.classList.add("done");
            doneArr.push("true");
            renderCounter(doneArr, ".done__counter");
          } else {
            doneBtn.textContent = "Выполнено";
            userLi.classList.remove("done");
            doneArr.splice(0, 1);
            renderCounter(doneArr, ".done__counter");
          }
        });

        // Отрисовка счетчика
        renderCounter(taskArr, ".task__counter");
        renderCounter(doneArr, ".done__counter");

        userLi.classList.add("item");
        userLi.classList.add("open");
        setTimeout(() => {
          userLi.classList.remove("open");
        }, 1000);
        const taskDiv = getDiv("item__task");
        taskDiv.textContent = element.name;
        userLi.append(taskDiv, divBtn);
        ul.append(userLi);
      });
    } else {
      copyArr.forEach((element) => {
        const userLi = getLi("list-task__item", "");
        const divBtn = getDiv("list-task__btns");
        const doneBtn = getBtn("item__btn", "Выполнено", "btn-done");
        doneBtn.classList.add("btn");
        const btnDelete = getBtn("item__btn", "Удалить", "btn-delete");
        btnDelete.classList.add("btn");
        divBtn.append(btnDelete, doneBtn);
        if (userLi.classList.contains("open")) {
          userLi.remove();
        }

        taskArr.push(element.task);
        element.done == true ? (doneBtn.textContent = "Не выполнено") : (doneBtn.textContent = "Выполнено");
        element.done == true ? userLi.classList.add("done") : userLi.classList.remove("done");
        element.done == true ? doneArr.push("true") : doneArr.splice(0, 1);

        localUsers.forEach((user) => {
          user.name.forEach((userDone) => {
            // Отметка что дело выполнено
            console.log(userDone.done);
          });

          // Удаление дела
          btnDelete.addEventListener("click", () => {
            const popupDelete = popup("#delete-popup");
            const deleteText = document.querySelector("#popup-delete");
            deleteText.textContent = `Вы действительно хотите удалить "${element.task}"?`;
            document.querySelector("#btnYes").addEventListener("click", () => {
              userLi.remove();
              popupDelete.classList.remove("open");
              taskArr.splice(0, 1);
              user.name.forEach((userTask) => {
                if (element.task === userTask.task) {
                  user.name.splice(0, 1);
                }
                saveLocalStorage("localUsers", localUsers);
              });
            });
            if (element.done === true) {
              doneArr.splice(0, 1);
              renderCounter(doneArr, ".done__counter");
            }
            renderCounter(taskArr, ".task__counter");
            document.querySelector("#btnNo").addEventListener("click", () => {
              popupDelete.classList.remove("open");
            });
          });

          doneBtn.addEventListener("click", () => {
            user.name.forEach((userTask) => {
              if (element.task === userTask.task) {
                if (userTask.done === true) {
                  userTask.done = false;
                  element.done = false;
                  doneBtn.textContent = "Не выполнено";
                  userLi.classList.add("done");
                  doneArr.push("true");
                  renderCounter(doneArr, ".done__counter");
                } else {
                  userTask.done = true;
                  element.done = true;
                  doneBtn.textContent = "Выполнено";
                  userLi.classList.remove("done");
                  doneArr.splice(0, 1);
                  renderCounter(doneArr, ".done__counter");
                  console.log(element.done);
                }
              }
              saveLocalStorage("localUsers", localUsers);
            });
          });
        });

        // Отрисовка счетчика
        renderCounter(taskArr, ".task__counter");
        renderCounter(doneArr, ".done__counter");

        userLi.classList.add("item");
        userLi.classList.add("open");
        setTimeout(() => {
          userLi.classList.remove("open");
        }, 1000);
        const taskDiv = getDiv("item__task");
        taskDiv.textContent = element.task;
        userLi.append(taskDiv, divBtn);
        ul.append(userLi);
      });
    }
  }, 1500);
}
