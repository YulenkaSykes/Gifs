import React, { useContext } from "react";
import { Context } from "../App";
import Gif from "./Gif";
import Icon from "@material-ui/core/Icon";

const LikeList = () => {
  const { store, dispatch } = useContext(Context);
  return (
    <div className="like">
      <div className="col">
        <span
          style={{ margin: "10px" }}
          className="icon-close"
          onClick={() => dispatch({ type: "show_ll" })}
        >
          <Icon>close</Icon>
        </span>
      </div>
      <h1>Like List</h1>
      {store?.ll.length > 0 ? (
        store.ll.map((item) => <Gif gif={item} />)
      ) : (
        <h1>No like gifs</h1>
      )}
    </div>
  );
};

export default LikeList;
