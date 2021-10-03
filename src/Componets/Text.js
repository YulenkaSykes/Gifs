import React, { useContext, useState } from "react";
import { Context } from "../App";
import Gif from "./Gif";

const Text = () => {
  const { key } = useContext(Context);

  const getGifs = (q) => {
    setLoading(true);
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${q}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setGif(data.data);
        console.log(data);
      });
  };

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [gif, setGif] = useState();
  return (
    <div className="col centered text">
      <h1>Enter a random word</h1>
      <div className="row centered">
        <input
          className="input_t_s"
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          className="btn"
          onClick={() => {
            setText("");
            getGifs(text);
          }}
        >
          Create
        </button>
      </div>
      {loading && <h1>Loading...</h1>}
      <div className="wrapper row">{gif && <Gif gif={gif} />}</div>
    </div>
  );
};

export default Text;
