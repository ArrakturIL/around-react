/* ========================================================================== */
/* =                             IMPORTS                                    = */
/* ========================================================================== */

import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
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
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [cardPopup, setCardPopup] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = useState([]);
  const [selectedToDeleteCard, setSelectedToDeleteCard] = useState(null);

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
  /* =                            API FUNCTIONS                               = */
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
    api
      .deleteCard(card._id)
      .then(() => {
        closeAllPopups();
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleUpdateUser(currentUser) {
    api
      .updateUserInfo({ name: currentUser.name, about: currentUser.about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleUpdateAvatar(currentUser) {
    api
      .updateAvatar({ avatar: currentUser.avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleAddPlaceSubmit(newPlace) {
    api
      .createCard(newPlace)
      .then((newPlace) => {
        setCards([newPlace, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }


  /* ========================================================================== */
  /* =                            FUNCTIONS                                   = */
  /* ========================================================================== */

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }

  function handleConfirmClick(card) {
    setSelectedToDeleteCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setCardPopup(card);
  }

  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setIsEditAvatarOpen(false);
    setIsConfirmDeletePopupOpen(false);
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

        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlaceOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={selectedToDeleteCard}
        />
        
        <ImagePopup card={cardPopup} onClose={closeAllPopups} />

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
