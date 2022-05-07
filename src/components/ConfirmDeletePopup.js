import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, onClose, card, onCardDelete }) {
    function handleSubmit(e) {
        e.preventDefault();
        onCardDelete(card);
    }
    return (
        <PopupWithForm
          name="confirm"
          title="Are you sure?"
          submitButton="Yes"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        ></PopupWithForm>
    );
}
export default ConfirmDeletePopup;