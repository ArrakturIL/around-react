// Create the PopupWithForm component and use it for the following popups:
// "Edit profile", "New place", "Update avatar", "confirm".
// These popups share a lot of common markup: elements of the external and internal container, the form itself, the title, and two buttons.
// All the common markup should be placed inside the new component.
// The titles and the form identifiers (in the form of strings) should be passed from outside the component itself.
// To do this, add the corresponding title and name props, then substitute their values inside the JSX.

function PopupWithForm(props) {
  const { title, name, isOpen, onClose, submitButton, children } = props;

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
          className={"edit-form edit-form_el_${name}"}
          action="#"
        >
          <fieldset className="edit-form__input">
           
              <h2 className="edit-form__heading">{title}</h2>

              {children}
            
          </fieldset>
          <button className="edit-form__save" type="submit">
            {submitButton}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
