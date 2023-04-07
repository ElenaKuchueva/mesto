const config = {
    formSelector: '.fields',
    inputSelector: '.field',
    submitButtonSelector: '.submit',
    inactiveButtonClass: 'submit_inactive',
    inputErrorClass: 'field_type_error',
    inputMessageErrorClass: 'field-message-error_active',
    errorClass: '-message-error'
  };
  
  class FormValidator {
    constructor(config, formElement) {
    this.config = config;
    this.formElement = formElement;
    }
  
  //   //шаблон: показать ошибку валидации
  //  _showInputError(formElement, inputElement, errorMessage) {
  //   const fieldErrorMessage = formElement.querySelector(`.${inputElement.id}${this.config.errorClass}`);
  //   inputElement.classList.add(this.config.inputErrorClass);
  //   fieldErrorMessage.textContent = errorMessage;
  //   fieldErrorMessage.classList.add(this.config.inputMessageErrorClass);
  // };

    //показать ошибку валидации
    _showInputError(inputElement, errorMessage) {
      const fieldErrorMessage = this.formElement.querySelector(`.${inputElement.id}${this.config.errorClass}`);
      inputElement.classList.add(this.config.inputErrorClass);
      fieldErrorMessage.textContent = errorMessage;
      fieldErrorMessage.classList.add(this.config.inputMessageErrorClass);
    };

  // //шаблон: скрыть ошибку валидации
  //  _hideInputError(formElement, inputElement) {
  //   const fieldErrorMessage = formElement.querySelector(`.${inputElement.id}${this.config.errorClass}`);
  //   inputElement.classList.remove(this.config.inputErrorClass);
  //   fieldErrorMessage.classList.remove(this.config.inputMessageErrorClass);
  //   fieldErrorMessage.textContent = '';
  // };
  
 //скрыть ошибку валидации
 _hideInputError(inputElement) {
  const fieldErrorMessage =  this.formElement.querySelector(`.${inputElement.id}${this.config.errorClass}`);
  inputElement.classList.remove(this.config.inputErrorClass);
  fieldErrorMessage.classList.remove(this.config.inputMessageErrorClass);
  fieldErrorMessage.textContent = '';
};

  // //шаблон: проверка на валидность
  // _isValid(formElement, inputElement) {
  //   if (!inputElement.validity.valid) {
  //     this._showInputError(formElement, inputElement, inputElement.validationMessage);
  //   } else {
  //     this._hideInputError(formElement, inputElement);
  //   }
  // };


    //проверить на валидность
    _isValid(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };
  
  //проверка на невалидность полей
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  //неактивная кнопка формы
  _disabledFormButton(buttonElement) {
    buttonElement.classList.add(this.config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  };
  
  //активная кнопка формы
  _enabledFormButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
  
  //изменить цвета кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disabledFormButton(buttonElement, this.config.inactiveButtonClass);
    } else {
      this._enabledFormButton(buttonElement, this.config.inactiveButtonClass);
    }
  };
  
  // resetValidation() {
  //   this._toggleButtonState(); <== управляем кнопкой ==

  //   this._inputList.forEach((inputElement) => {
  //     this._hideError(inputElement) <==очищаем ошибки ==
  //   });

  // }

  // //добавить всем полям слушатель
  // _setEventListeners(formElement) {
  //   const inputList = Array.from(formElement.querySelectorAll(this.config.inputSelector));
  //   const buttonElement = formElement.querySelector(this.config.submitButtonSelector);
  //   this._toggleButtonState(inputList, buttonElement);
  //   formElement.addEventListener('reset', () => {
  //     this._disabledFormButton(buttonElement);
  //   });
  //   inputList.forEach((inputElement) => {
  //     inputElement.addEventListener('input', () => {
  //       this._isValid(formElement, inputElement);
  //       this._toggleButtonState(inputList, buttonElement);
  //     });
  //   });
  // };
  
 //добавить всем полям слушатель
 _setEventListeners() {
  const inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
  const buttonElement = this.formElement.querySelector(this.config.submitButtonSelector);
  this._toggleButtonState(inputList, buttonElement);
  this.formElement.addEventListener('reset', () => {
    this._disabledFormButton(buttonElement);
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  });
};

  // //добавить всем формам слушатель
  // enableValidation() {
  //   const formList = Array.from(document.querySelectorAll(this.config.formSelector));
  //   formList.forEach((formElement) => {
  //     this._setEventListeners(formElement);
  //   });
  // };

  //добавить всем формам слушатель
  enableValidation() {
    this._setEventListeners();
  }

  }
 export {FormValidator, config};
