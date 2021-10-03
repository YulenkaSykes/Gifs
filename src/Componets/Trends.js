import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App";
import Gif from "./Gif";

const Giphy = () => {
  const { key } = useContext(Context);
  const [gif, setGif] = useState([]);

  useEffect(() => {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${key}`)
      .then((response) => response.json())
      .then((data) => {
        setGif(data.data);
        console.log(data);
      });
  }, []);

  return (
    <div className="col centered">
      <h1>Trends</h1>
      <div className="wrapper row centered">
        {gif?.length > 0 ? (
          gif.map((gif) => <Gif gif={gif} />)
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default Giphy;
