import React, { useContext } from "react";
import Icon from "@material-ui/core/Icon";
import { Context } from "../App";

const Gif = ({ gif }) => {
  const { store, dispatch } = useContext(Context);

  const { title, user, trending_datetime, images, id } = gif;
  return (
    <div className="gif" style={{ background: `url(${images.original.url})` }}>
      <div className="content col centered">
        <h2 className="tittle_card">{title}</h2>
        <div className="row centered">
          {store.ll.find((item) => item.id === id) ? (
            <span
              onClick={() => dispatch({ type: "remove_from_ll", payload: gif })}
            >
              <Icon fontSize="large">favorite</Icon>
            </span>
          ) : (
            <span onClick={() => dispatch({ type: "add_to_ll", payload: gif })}>
              <Icon fontSize="large">favorite_border</Icon>
            </span>
          )}
          <span
            className="icon"
            onClick={() => {
              dispatch({ type: "add_prev_gif", payload: gif });
              console.log(gif);
              console.log(store.prevGif);
            }}
          >
            <Icon>info</Icon>
          </span>
          <span className="icon">
            <a href={images.original.url}>
              <Icon>download</Icon>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Gif;
