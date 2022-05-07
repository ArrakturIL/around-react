import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({
  isOpen,
  onClose,
  card,
  onCardDelete,
  isLoading,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }
  return (
    <PopupWithForm
      name="confirm"
      title="Are you sure?"
      submitButton="Yes"
      loadingButton="Deleting..."
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}
export default ConfirmDeletePopup;
