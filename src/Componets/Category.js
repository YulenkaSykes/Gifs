import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App";
import Icon from "@material-ui/core/Icon";
// import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import Gif from "./Gif";

const Category = () => {
  const { store, dispatch, key } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [gifsArreys, setGifsArreys] = useState([]);
  const [current, setCurrent] = useState();
  const [value, setValue] = useState();
  const [showAside, setShowAside] = useState(true);

  const getCategories = () => {
    setLoading(true);
    fetch(`https://api.giphy.com/v1/gifs/categories?api_key=${key}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        setCategories(data.data);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getGifs(current);
  }, [current]);

  const getGifs = (q) => {
    if (q) {
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${q}`)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setGifsArreys(data.data);
          console.log(data);
        });
    }
  };

  return (
    <div className="col centered">
      {!current ? (
        <h1>Select category</h1>
      ) : (
        <h1>Category: {current && current}</h1>
      )}
      <div className="row centered">
        {showAside ? (
          <aside className="col">
            <span className="icon-close" onClick={() => setShowAside(false)}>
              <Icon>close</Icon>
            </span>
            <div className="row centered search-input">
              <input type="text" onChange={(e) => setValue(e.target.value)} />
              <Icon>search</Icon>
            </div>
            {categories.length > 0 && value
              ? categories
                  .filter((cat) => cat.name.includes(value))
                  .map((cat) => (
                    <div className="row centered category-tittle">
                      <h3 onClick={() => setCurrent(cat.name)}>{cat.name}</h3>
                      <div className="row centered">
                        {store.lc.find((item) => item === cat.name) ? (
                          <span
                            style={{ color: "red" }}
                            className="icon"
                            onClick={() =>
                              dispatch({
                                type: "remove_from_lc",
                                payload: cat.name,
                              })
                            }
                          >
                            <Icon>favorite</Icon>
                          </span>
                        ) : (
                          <span
                            className="icon"
                            onClick={() => {
                              dispatch({ type: "add_lc", payload: cat.name });
                              M.toast({ html: "Return my favorite!" });
                            }}
                          >
                            <Icon>favorite</Icon>
                          </span>
                        )}
                        <img src={cat.gif.images.original.url} alt="gif" />
                      </div>
                    </div>
                  ))
              : categories.map((cat) => (
                  <div className="row centered category-tittle">
                    <h3 onClick={() => setCurrent(cat.name)}>{cat.name}</h3>
                    <div className="row centered">
                      {store.lc.find((item) => item === cat.name) ? (
                        <span
                          style={{ color: "red" }}
                          className="icon"
                          onClick={() =>
                            dispatch({
                              type: "remove_from_lc",
                              payload: cat.name,
                            })
                          }
                        >
                          <Icon>favorite</Icon>
                        </span>
                      ) : (
                        <span
                          className="icon"
                          onClick={() =>
                            dispatch({ type: "add_lc", payload: cat.name })
                          }
                        >
                          <Icon>favorite</Icon>
                        </span>
                      )}

                      <img src={cat.gif.images.original.url} alt="gif" />
                    </div>
                  </div>
                ))}
          </aside>
        ) : (
          <button className="show-side-btn" onClick={() => setShowAside(true)}>
            Categories
          </button>
        )}
        <div className="wrapper centered row">
          {gifsArreys.length > 0 && gifsArreys.map((gif) => <Gif gif={gif} />)}
        </div>
      </div>
    </div>
  );
};

export default Category;
