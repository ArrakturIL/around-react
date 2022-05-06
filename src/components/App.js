/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";

/* ========================================================================== */
/* =                               MAIN APP                                 = */
/* ========================================================================== */

function App() {
  /* ========================================================================== */
  /* =                             USE STATE                                  = */
  /* ========================================================================== */

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [cardPopup, setCardPopup] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [cards, setCards] = useState([]);
  // const [selectedToDeleteCard, setSelectedToDeleteCard] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  /* ========================================================================== */
  /* =                             USE EFFECT                                 = */
  /* ========================================================================== */

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);

  /* ========================================================================== */
  /* =                             FUNCTIONS                                  = */
  /* ========================================================================== */

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleCardDelete(card) {
    // setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        closeAllPopups();
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .finally(() => {
        // setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }


  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }

  function handleConfirmClick() {
    setIsConfirmOpen(true);
  }

  function handleCardClick(card) {
    setCardPopup(card);
  }

  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setIsEditAvatarOpen(false);
    setIsConfirmOpen(false);
    setCardPopup(undefined);
  }

  /* ========================================================================== */
  /* =                             ROOT COMPONENT                             = */
  /* ========================================================================== */

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onConfirmDeleteClick={handleConfirmClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <PopupWithForm
          name="profile"
          title="Edit profile"
          submitButton="Save"
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
        >
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
            />
            <span id="about-error" className="edit-form__error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="new-place"
          title="New place"
          submitButton="Create"
          isOpen={isAddPlaceOpen}
          onClose={closeAllPopups}
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
            />
            <span id="link-error" className="edit-form__error"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="edit-avatar"
          title="Change avatar"
          submitButton="Save"
          isOpen={isEditAvatarOpen}
          onClose={closeAllPopups}
        >
          {" "}
          <label className="edit-form__label">
            <input
              name="avatar"
              id="avatar"
              type="url"
              className="edit-form__text-input edit-form__text-input_el_avatar"
              placeholder="Avatar URL"
              required
            />
            <span id="avatar-error" className="edit-form__error"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="confirm"
          title="Are you sure?"
          submitButton="Yes"
          isOpen={isConfirmOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup card={cardPopup} onClose={closeAllPopups} />

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
