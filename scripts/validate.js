// //шаблон: показать ошибку валидации
// const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, inputMessageErrorClass, errorClass) => {
//   const fieldErrorMessage = formElement.querySelector(`.${inputElement.id}${errorClass}`);
//   inputElement.classList.add(inputErrorClass);
//   fieldErrorMessage.textContent = errorMessage;
//   fieldErrorMessage.classList.add(inputMessageErrorClass);
// };

// //шаблон: скрыть ошибку валидации
// const hideInputError = (formElement, inputElement, inputErrorClass, inputMessageErrorClass, errorClass) => {
//   const fieldErrorMessage = formElement.querySelector(`.${inputElement.id}${errorClass}`);
//   inputElement.classList.remove(inputErrorClass);
//   fieldErrorMessage.classList.remove(inputMessageErrorClass);
//   fieldErrorMessage.textContent = '';
// };

// //шаблон: проверка на валидность
// const isValid = (formElement, inputElement, inputErrorClass, inputMessageErrorClass, errorClass) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, inputMessageErrorClass, errorClass);
//   } else {
//     hideInputError(formElement, inputElement, inputErrorClass, inputMessageErrorClass, errorClass);
//   }
// };

// //проверка на невалидность полей
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// //неактивная кнопка формы
// const disabledFormButton = (buttonElement, inactiveButtonClass) => {
//   buttonElement.classList.add(inactiveButtonClass);
//   buttonElement.setAttribute('disabled', true);
// };

// //активная кнопка формы
// const enabledFormButton = (buttonElement, inactiveButtonClass) => {
//   buttonElement.classList.remove(inactiveButtonClass);
//   buttonElement.removeAttribute('disabled');
// };

// //изменение цвета кнопки
// const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
//   if (hasInvalidInput(inputList)) {
//     disabledFormButton(buttonElement, inactiveButtonClass);
//   } else {
//     enabledFormButton(buttonElement, inactiveButtonClass);
//   }
// };

// //добавить всем полям слушатель
// const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, inputMessageErrorClass, errorClass) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//   formElement.addEventListener('reset', () => {
//     disabledFormButton(buttonElement, inactiveButtonClass);
//   });
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       isValid(formElement, inputElement, inputErrorClass, inputMessageErrorClass, errorClass);
//       toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//     });
//   });
// };

// //добавить всем формам слушатель
// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, config.inputSelector, config.submitButtonSelector, config.inactiveButtonClass, config.inputErrorClass, config.inputMessageErrorClass, config.errorClass);
//   });
// };

const config = {
  formSelector: '.fields',
  inputSelector: '.field',
  submitButtonSelector: '.submit',
  inactiveButtonClass: 'submit_inactive',
  inputErrorClass: 'field_type_error',
  inputMessageErrorClass: 'field-message-error_active',
  errorClass: '-message-error'
};

// enableValidation(config);

class Validate {
  constructor(config) {
  this.config = config;
  }

  //шаблон: показать ошибку валидации
 showInputError(formElement, inputElement, errorMessage) {
  const fieldErrorMessage = formElement.querySelector(`.${inputElement.id}${this.config.errorClass}`);
  inputElement.classList.add(this.config.inputErrorClass);
  fieldErrorMessage.textContent = errorMessage;
  fieldErrorMessage.classList.add(this.config.inputMessageErrorClass);
};

//шаблон: скрыть ошибку валидации
 hideInputError(formElement, inputElement) {
  const fieldErrorMessage = formElement.querySelector(`.${inputElement.id}${this.config.errorClass}`);
  inputElement.classList.remove(this.config.inputErrorClass);
  fieldErrorMessage.classList.remove(this.config.inputMessageErrorClass);
  fieldErrorMessage.textContent = '';
};

//шаблон: проверка на валидность
isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    this.showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    this.hideInputError(formElement, inputElement);
  }
};

//проверка на невалидность полей
hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//неактивная кнопка формы
disabledFormButton(buttonElement) {
  buttonElement.classList.add(this.config.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

//активная кнопка формы
enabledFormButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
};

//изменение цвета кнопки
toggleButtonState(inputList, buttonElement) {
  if (this.hasInvalidInput(inputList)) {
    this.disabledFormButton(buttonElement, this.config.inactiveButtonClass);
  } else {
    this.enabledFormButton(buttonElement, this.config.inactiveButtonClass);
  }
};

//добавить всем полям слушатель
setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(this.config.inputSelector));
  const buttonElement = formElement.querySelector(this.config.submitButtonSelector);
  this.toggleButtonState(inputList, buttonElement);
  formElement.addEventListener('reset', () => {
    this.disabledFormButton(buttonElement);
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this.isValid(formElement, inputElement);
      this.toggleButtonState(inputList, buttonElement);
    });
  });
};

//добавить всем формам слушатель
enableValidation() {
  const formList = Array.from(document.querySelectorAll(this.config.formSelector));
  formList.forEach((formElement) => {
    this.setEventListeners(formElement);
  });
};
}

 const validation = new  Validate(config);
 validation.enableValidation(config);
