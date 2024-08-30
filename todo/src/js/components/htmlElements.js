// Вспомогательные функции

// Возвращает div
export function getDiv(classDiv) {
  const div = document.createElement("div");
  div.classList.add(classDiv);
  return div;
}

// Возвращает span
export function getSpan(classSpan, textSpan, spanId) {
  const span = document.createElement("span");
  span.classList.add(classSpan);
  span.id = spanId;
  span.textContent = textSpan;
  return span;
}

// Возвращает button
export function getBtn(classBtn, textBtn, btnId, typeBtn) {
  const btn = document.createElement("button");
  btn.classList.add(classBtn);
  btn.id = btnId;
  btn.textContent = textBtn;
  btn.type = typeBtn;
  return btn;
}

// Возвращает ссылку
export function getLink(classLink, idLink, hrefLink, textLink) {
  const link = document.createElement("a");
  link.classList.add(classLink);
  link.id = idLink;
  link.href = hrefLink;
  link.textContent = textLink;
  return link;
}

// Возвращает элемент списка
export function getUl(classUl) {
  const ul = document.createElement("ul");
  ul.classList.add(classUl);
  return ul;
}

// Возвращает элемент списка
export function getLi(classLi, idLi) {
  const li = document.createElement("li");
  li.classList.add(classLi);
  li.id = idLi;
  return li;
}

// Возвращает форму
export function getForm(classForm, idForm, actionForm) {
  const form = document.createElement("form");
  form.classList.add(classForm);
  form.id = idForm;
  form.action = actionForm;
  return form;
}

// Возвращает input
export function getInput(classInput, idInput) {
  const input = document.createElement("input");
  input.classList.add(classInput);
  input.id = idInput;
  return input;
}
