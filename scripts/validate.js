//шаблон: показать ошибку валидации
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, inputMessageErrorClass, errorClass) => {
  const fieldErrorMessage = formElement.querySelector(`.${inputElement.id}${errorClass}`);
  inputElement.classList.add(inputErrorClass);
  fieldErrorMessage.textContent = errorMessage;
  fieldErrorMessage.classList.add(inputMessageErrorClass);
};

//шаблон: скрыть ошибку валидации
const hideInputError = (formElement, inputElement, inputErrorClass, inputMessageErrorClass, errorClass) => {
  const fieldErrorMessage = formElement.querySelector(`.${inputElement.id}${errorClass}`);
  inputElement.classList.remove(inputErrorClass);
  fieldErrorMessage.classList.remove(inputMessageErrorClass);
  fieldErrorMessage.textContent = '';
};

//шаблон: проверка на валидность
const isValid = (formElement, inputElement, inputErrorClass, inputMessageErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, inputMessageErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, inputMessageErrorClass, errorClass);
  }
};

//проверка на невалидность полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//неактивная кнопка формы
const disabledFormButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

//активная кнопка формы
const enabledFormButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
};

//изменение цвета кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disabledFormButton(buttonElement, inactiveButtonClass);
  } else {
    enabledFormButton(buttonElement, inactiveButtonClass);
  }
};

//добавить всем полям слушатель
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, inputMessageErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  formElement.addEventListener('reset', () => {
    disabledFormButton(buttonElement, inactiveButtonClass);
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputErrorClass, inputMessageErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

//добавить всем формам слушатель
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config.inputSelector, config.submitButtonSelector, config.inactiveButtonClass, config.inputErrorClass, config.inputMessageErrorClass, config.errorClass);
  });
};

const config = {
  formSelector: '.fields',
  inputSelector: '.field',
  submitButtonSelector: '.submit',
  inactiveButtonClass: 'submit_inactive',
  inputErrorClass: 'field__type_error',
  inputMessageErrorClass: 'field__type_error_message-active',
  errorClass: '-message-error'
};

enableValidation(config);