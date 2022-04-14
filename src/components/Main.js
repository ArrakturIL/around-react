import api from "../utils/api";
import { useState, useEffect } from "react";
import Card from "./Card";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onConfirmDeleteClick,
}) {
  const [cards, setCards] = useState([]);
  const [userName, setUserName] = useState("");
  const [userAbout, setUserAbout] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserAbout(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });

    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
          >
            <div className="profile__avatar-overlay">
              <button
                className="profile__avatar-edit"
                type="button"
                id="edit-avatar"
                onClick={onEditAvatarClick}
              ></button>
            </div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__about">{userAbout}</p>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfileClick}
            ></button>
          </div>

          <button
            onClick={onAddPlaceClick}
            type="button"
            className="profile__add-button"
          ></button>
        </section>

        <section className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onConfirmDeleteClick={onConfirmDeleteClick}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
