import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleAboutChange(e) {
    setAbout(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Edit profile"
      submitButton="Save"
      loadingButton="Saving..."
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      {" "}
      <label className="edit-form__label">
        <input
          name="name"
          id="name"
          type="text"
          className="edit-form__text-input edit-form__text-input_el_name"
          placeholder="Name"
          required
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span id="name-error" className="edit-form__error"></span>
      </label>
      <label className="edit-form__label">
        <input
          name="about"
          id="about"
          type="text"
          className="edit-form__text-input edit-form__text-input_el_about"
          placeholder="About Me"
          required
          minLength="2"
          maxLength="200"
          value={about || ""}
          onChange={handleAboutChange}
        />
        <span id="about-error" className="edit-form__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
