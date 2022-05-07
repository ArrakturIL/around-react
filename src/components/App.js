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
import FormValidator from "../utils/FormValidator";
import config from "../utils/config";

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
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [cardPopup, setCardPopup] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = useState([]);
  const [selectedToDeleteCard, setSelectedToDeleteCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  // ========================================================================== //

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

  // ========================================================================== //

  useEffect(() => {
    const handleClickClose = (e) => {
      if (
        e.target.classList.contains("popup_open") ||
        e.target.classList.contains("popup__close")
      ) {
        closeAllPopups();
      }
    };

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    if (
      isEditProfileOpen ||
      isAddPlaceOpen ||
      isEditAvatarOpen ||
      isConfirmDeletePopupOpen ||
      cardPopup
    ) {
      document.addEventListener("mousedown", handleClickClose);
      document.addEventListener("keydown", handleEscClose);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickClose);
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [
    isEditProfileOpen,
    isAddPlaceOpen,
    isEditAvatarOpen,
    isConfirmDeletePopupOpen,
    cardPopup,
  ]);

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

  // ========================================================================== //

  function handleCardDelete(card) {
    setIsLoading(true);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ========================================================================== //

  function handleUpdateUser(currentUser) {
    setIsLoading(true);
    api
      .updateUserInfo({ name: currentUser.name, about: currentUser.about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ========================================================================== //

  function handleUpdateAvatar(currentUser) {
    setIsLoading(true);
    api
      .updateAvatar({ avatar: currentUser.avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })

      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ========================================================================== //

  function handleAddPlaceSubmit(newPlace) {
    setIsLoading(true);
    api
      .createCard(newPlace)
      .then((newPlace) => {
        setCards([newPlace, ...cards]);
        closeAllPopups();
      })

      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /* ========================================================================== */
  /* =                            CONSTANS                                   = */
  /* ========================================================================== */

  const formValidators = {};
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      const validator = new FormValidator(formElement, config);
      const formName = formElement.getAttribute("name");
      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };

  enableValidation(config);
  /* ========================================================================== */
  /* =                            FUNCTIONS                                   = */
  /* ========================================================================== */

  function handleEditProfileClick() {
    formValidators["profile"].resetValidation();
    setIsEditProfileOpen(true);
  }

  // ========================================================================== //

  function handleAddPlaceClick() {
    formValidators["new-place"].resetValidation();
    setIsAddPlaceOpen(true);
  }

  // ========================================================================== //

  function handleEditAvatarClick() {
    formValidators["edit-avatar"].resetValidation();
    setIsEditAvatarOpen(true);
  }

  // ========================================================================== //

  function handleConfirmClick(card) {
    setSelectedToDeleteCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  // ========================================================================== //

  function handleCardClick(card) {
    setCardPopup(card);
  }

  // ========================================================================== //
  
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
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlaceOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          isLoading={isLoading}
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
