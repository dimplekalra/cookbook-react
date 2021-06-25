import React from "react";
import { useHistory } from "react-router-dom";

const SingleRecipe = ({
  name,
  imageUrl,
  id,
  toggleFavourite,
  isFavourite,
  votes,
  description,
  onClick,
}) => {
  const history = useHistory();

  const renderVotes = (votes) => {
    let temp = [];
    for (let i = 0; i < votes; i++) {
      temp.push(
        <span>
          <i className="fa fa-star"></i>
        </span>
      );
    }

    return <div className="stars-icon">{temp}</div>;
  };

  return (
    <li className="item" onClick={(e) => onClick(id)}>
      <div className="imagewrapper">
        <img src={imageUrl} />
        <span
          className={`favourite-icon `}
          onClick={(e) => e.stopPropagation()}
        >
          <span
            className={isFavourite ? "active" : ""}
            onClick={(e) => toggleFavourite(id)}
          >
            <i className="fa fa-heart" aria-hidden="true"></i>
          </span>
        </span>
      </div>
      <div className="item-content">
        <h3>{name}</h3>
        <p>{description}</p>
        {renderVotes(votes)}
      </div>
    </li>
  );
};

export default SingleRecipe;
