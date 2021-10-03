import "./App.css";
import { useReducer, createContext, useEffect } from "react";
import Trends from "./Componets/Trends";
import Text from "./Componets/Text";
import Category from "./Componets/Category";
import Search from "./Componets/Search";
import LikeList from "./Componets/LikeList";
import Main from "./Componets/Main";

import Preview from "./Componets/Preview";

export const Context = createContext(null);

const reducer = (store, action) => {
  switch (action.type) {
    case "change_tab":
      return { ...store, tab: action.payload };
    case "show_ll":
      return { ...store, showLL: !store.showLL };
    case "init":
      return { ...store, ll: action.payload };
    case "add_to_ll":
      return { ...store, ll: [...store.ll, action.payload] };
    case "remove_from_ll":
      return {
        ...store,
        ll: store.ll.filter((item) => item.id !== action.payload.id),
      };
    case "add_prev_gif":
      return { ...store, prevGif: action.payload };
    case "remove_prev_gif":
      return { ...store, prevGif: null };
    case "init_lc":
      return { ...store, lc: action.payload };
    case "add_lc":
      return { ...store, lc: [...store.lc, action.payload] };
    case "remove_from_lc":
      return {
        ...store,
        lc: store.lc.filter((item) => item !== action.payload),
      };

    default:
      return store;
  }
};

function App() {
  const [store, dispatch] = useReducer(reducer, {
    tab: "trends",
    showLL: false,
    ll: [],
  });
  useEffect(() => {
    dispatch({
      type: "init",
      payload: localStorage.getItem("ll")
        ? JSON.parse(localStorage.getItem("ll"))
        : [],
    });

    dispatch({
      type: "init_lc",
      payload: localStorage.getItem("lc")
        ? JSON.parse(localStorage.getItem("lc"))
        : [],
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("ll", JSON.stringify(store.ll));
  }, [store.ll]);

  useEffect(() => {
    localStorage.setItem("lc", JSON.stringify(store.lc));
  }, [store.lc]);
  return (
    <div className="App col centered">
      <header className="row header centered">
        <button
          onClick={() => dispatch({ type: "change_tab", payload: "main" })}
        >
          My favorite
        </button>
        <button
          onClick={() => dispatch({ type: "change_tab", payload: "trends" })}
        >
          Trends
        </button>
        <button
          onClick={() => dispatch({ type: "change_tab", payload: "text" })}
        >
          Create Text
        </button>
        <button
          onClick={() => dispatch({ type: "change_tab", payload: "search" })}
        >
          Search
        </button>
        <button
          onClick={() => dispatch({ type: "change_tab", payload: "category" })}
        >
          Category
        </button>
        <button onClick={() => dispatch({ type: "show_ll" })}>Like List</button>
      </header>
      <Context.Provider
        value={{ store, dispatch, key: "87JQLyjE7LUEf2bII4WVvYCFmBxEujcz" }}
      >
        {store.tab === "main" && <Main />}
        {store.tab === "trends" && <Trends />}
        {store.tab === "text" && <Text />}
        {store.tab === "search" && <Search />}
        {store.tab === "category" && <Category />}
        {store.showLL && <LikeList />}
        {store.prevGif && <Preview gif={store.prevGif} />}
      </Context.Provider>
    </div>
  );
}

export default App;
