import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isLoading }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newPlace = { name: title, link };
    onAddPlaceSubmit(newPlace);
  }

  return (
    <PopupWithForm
      name="new-place"
      title="New place"
      submitButton="Create"
      loadingButton="Creating..."
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      {" "}
      <label className="edit-form__label">
        <input
          name="title"
          id="title"
          type="text"
          className="edit-form__text-input edit-form__text-input_el_title"
          placeholder="Title"
          required
          minLength="2"
          maxLength="30"
          value={title || ""}
          onChange={handleTitleChange}
        />
        <span id="title-error" className="edit-form__error"></span>
      </label>
      <label className="edit-form__label">
        <input
          name="link"
          id="link"
          type="url"
          className="edit-form__text-input edit-form__text-input_el_link"
          placeholder="Image URL"
          required
          value={link || ""}
          onChange={handleLinkChange}
        />
        <span id="link-error" className="edit-form__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
