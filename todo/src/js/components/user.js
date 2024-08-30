// client
import * as html from "./htmlElements.js";
import { newTask } from "./newTask.js";

export async function getUser(owner, result) {
  const container = document.querySelector("#user-app");
  const title = html.getDiv("user__title");
  title.textContent = `Здравствуйте, ${owner}`;

  // Form add task
  const form = html.getForm("user__form", "new-task", "#");
  form.classList.add("users-form");
  const blockInp = html.getDiv("users-form__input-block");
  const input = html.getInput("users-form__input", "inp-name");
  input.dataset.require = "true";
  input.placeholder = "Введите новое дело!";
  input.type = "text";
  blockInp.append(input);
  const btn = html.getBtn("users-form_btn", "Добавить", "new-task", "submit");
  btn.classList.add("btn");
  form.append(blockInp, btn);

  const ul = html.getUl("block-list__list");

  newTask(form, input, owner, result);

  container.append(title, form, ul);
  return { container, ul };
}
