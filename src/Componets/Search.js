import React, { useState, useContext } from "react";
import { Context } from "../App";
import Gif from "./Gif";

const Search = () => {
  const { key } = useContext(Context);

  const [gifsArreys, setGifsArreys] = useState([]);
  const [req, setReq] = useState("");
  const [loading, setLoading] = useState(false);

  const getGifs = (q) => {
    setLoading(true);
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${q}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setGifsArreys(data.data);
        console.log(data);
      });
  };

  return (
    <div className="col centered">
      <h1>Search</h1>
      <div className="row centered">
        <input
          className="input_t_s"
          type="text"
          onChange={(e) => setReq(e.target.value)}
          value={req}
        />
        <button
          className="btn"
          onClick={() => {
            setReq("");
            getGifs(req);
          }}
        >
          Search
        </button>
      </div>
      {loading && <h1>Loading...</h1>}
      <div className="wrapper centered row">
        {gifsArreys.length > 0 && gifsArreys.map((gif) => <Gif gif={gif} />)}
      </div>
    </div>
  );
};

export default Search;
