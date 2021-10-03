import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App";
import Gif from "./Gif";
import Icon from "@material-ui/core/Icon";

const Section = ({ category }) => {
  const { key, dispatch } = useContext(Context);
  const [gifsArrey, setArrey] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGifs = (q) => {
    setLoading(true);
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${q}`)
      .then((response) => response.json())
      .then((data) => {
        setArrey(data.data);
        setLoading(false);
        console.log(data);
      });
  };

  useEffect(() => {
    getGifs(category);
  }, []);
  return (
    <section className="col section">
      <h1>
        <span
          className="icon-close"
          onClick={() =>
            dispatch({ type: "remove_from_lc", payload: category })
          }
        >
          <Icon>close</Icon>
        </span>
        {category}
        {""}
      </h1>
      <div className="row gif-wrapper">
        {loading && <h1>Loading...</h1>}
        {gifsArrey.length > 0 &&
          gifsArrey.slice(0, 7).map((gif) => <Gif gif={gif} />)}
      </div>
    </section>
  );
};

export default Section;
