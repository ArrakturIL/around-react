import { Component } from "react";

class FormValidator extends Component {
  constructor(formElement, config, ...props) {
    super(props);

    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._button = this._formElement.querySelector(this._submitButtonSelector);
  }
  _showInputError(input) {
    this._errorElement = this._formElement.querySelector(`#${input.id}-error`);
    this._errorElement.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass);
  }
  _hideInputError(input) {
    this._errorElement = this._formElement.querySelector(`#${input.id}-error`);
    this._errorElement.textContent = "";
    input.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
  }
  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.setAttribute("disabled", true);
      this._button.classList.add(this._inactiveButtonClass);
    } else {
      this._button.removeAttribute("disabled");
      this._button.classList.remove(this._inactiveButtonClass);
    }
  }
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  //Public methods
  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
}

export default FormValidator;
