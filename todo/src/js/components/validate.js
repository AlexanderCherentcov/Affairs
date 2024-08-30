export function validation(form, arr = []) {
  let validationResult = true;

  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains("error")) {
      parent.querySelector(".error-label").remove();
      parent.classList.remove("error");
    }
  }

  function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement("label");

    errorLabel.classList.add("error-label");
    errorLabel.textContent = text;

    parent.classList.add("error");

    parent.append(errorLabel);
  }

  form.querySelectorAll("input").forEach((input) => {
    removeError(input);
    // Валидация текстовых полей
    if (input.dataset.require == "true") {
      if (input.value.length < 3) {
        removeError(input);
        createError(input, "Поле должно содержать не менее 3 символов");
        validationResult = false;
      }
    }
    if (input.dataset.name == "true") {
      arr.forEach((user) => {
        if (user === input.value) {
          removeError(input);
          createError(input, "Пользователь с таким именем существует!");
          validationResult = false;
        }
      });

      if (input.value.length < 3) {
        removeError(input);
        createError(input, "Имя должно содержать не менее 3 символов");
        validationResult = false;
      }

      if (input.value.length > 20) {
        removeError(input);
        createError(input, "Имя не должно содержать больше 20 символов");
        validationResult = false;
      }
    }
  });
  return validationResult;
}
