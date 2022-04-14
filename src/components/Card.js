function Card({ onCardClick, card, onConfirmDeleteClick }) {
  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <article className="element">
      <button
        className="element__delete"
        type="button"
        onClick={onConfirmDeleteClick}
      ></button>
      <img
        className="element__post-img"
        alt={card.name}
        src={card.link}
        onClick={handleCardClick}
      />
      <div className="element__post-info">
        <h2 className="element__post-name">{card.name}</h2>
        <div className="element__like-wrapper">
          <button type="button" className="element__post-like"></button>
          <span className="element__like-count"> {card.likes.length} </span>
        </div>
      </div>
    </article>
  );
}

export default Card;