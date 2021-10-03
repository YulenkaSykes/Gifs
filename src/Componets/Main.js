import React, { useContext } from "react";
import { Context } from "../App";
import Section from "./Section";

const Main = () => {
  const { store } = useContext(Context);

  return (
    <div className="col main">
      {store.lc?.length > 0 ? (
        store.lc.map((cat) => <Section category={cat} />)
      ) : (
        <h1 className=" row centered">No like categories</h1>
      )}
    </div>
  );
};

export default Main;
