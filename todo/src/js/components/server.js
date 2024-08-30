const SERVER_URL = "http://localhost:3000/api/todos";

export const response = await fetch(SERVER_URL);

export async function getTodoListId(owner) {
  const response = await fetch(`${SERVER_URL}?owner=${owner}`);
  return await response.json();
}

export async function getTodoList() {
  const response = await fetch(`${SERVER_URL}`);
  return await response.json();
}

export async function createTodoItem(obj) {
  const response = await fetch(`${SERVER_URL}`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export function switchTodoItemDone(todoItem) {
  todoItem.done = !todoItem.done;
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: "PATCH",
    body: JSON.stringify({ done: todoItem.done }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function deleteTodoItem(id) {
  fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE",
  });
}
