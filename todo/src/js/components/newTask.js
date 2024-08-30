import { validation } from "./validate.js";
import { listClient, localUsers } from "../app.js";
import { createTodoItem, getTodoListId } from "./server.js";
import { renderUserTask } from "./render.js";
import { extractionLocalStorage, saveLocalStorage } from "./localStorage.js";

export function newTask(form, input, owner, result) {
  if (result === false) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (validation(this) === true) {
        let newObjUser = {
          name: input.value,
          owner: owner,
        };

        await createTodoItem(newObjUser);
        listClient.push(newObjUser);
        const arr = await getTodoListId(owner);

        renderUserTask(arr, owner, result);
      }
    });
  } else {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let newObjUser = {
        task: input.value,
        done: false,
      };
      const localUsers = extractionLocalStorage("localUsers");

      if (validation(this) === true) {
        for (const user of localUsers) {
          if (user.owner === owner) {
            user.name.push(newObjUser);
            saveLocalStorage("localUsers", localUsers);
            renderUserTask(user.name, owner, result);
          }
        }
      }
    });
  }
}
