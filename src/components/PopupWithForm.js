function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  submitButton,
  children,
  onSubmit,
  isLoading,
  loadingButton,
}) {
  return (
    <section className={`popup popup_el_${name} ${isOpen ? `popup_open` : ``}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>

        <form
          name={name}
          className={`edit-form edit-form_el_${name}`}
          action="#"
          onSubmit={onSubmit}
        >
          <fieldset className="edit-form__input">
            <h2 className="edit-form__heading">{title}</h2>

            {children}
          </fieldset>
          <button className="edit-form__save" type="submit">
            {isLoading ? loadingButton : submitButton}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
