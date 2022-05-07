import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Change avatar"
      submitButton="Save"
      loadingButton="Saving..."
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <label className="edit-form__label">
        <input
          name="avatar"
          id="avatar"
          type="url"
          className="edit-form__text-input edit-form__text-input_el_avatar"
          placeholder="Avatar URL"
          required
          ref={inputRef}
        />
        <span id="avatar-error" className="edit-form__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
