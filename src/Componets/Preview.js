import React, { useContext } from "react";
import { Context } from "../App";
import Icon from "@material-ui/core/Icon";

const Preview = ({ gif }) => {
  const { dispatch } = useContext(Context);
  const { title, user, trending_datetime, images, id } = gif;

  return (
    <div className="col centered prev-wrapper">
      <div className="row centered preview">
        <img src={images.original.url} alt="" className="gif_img" />
        <div className="col info">
          <span
            className="icon-close"
            onClick={() => dispatch({ type: "remove_prev_gif" })}
          >
            <Icon>close</Icon>
          </span>
          {user ? (
            <>
              <div className="row centered">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="" className="avatar" />
                ) : (
                  <Icon>person</Icon>
                )}
                <p>{user.display_name}</p>
              </div>
              <p>
                profile : <a href={user.profile_url}>Link</a>
              </p>
              <p>
                Instagram: <a href={user.instagram_url}>Link</a>
              </p>
              <p>
                Data of creationg:{" "}
                {trending_datetime.split(" ")[0].split("-").reverse().join(".")}
              </p>
            </>
          ) : (
            <div className="row centered">
              <h1>No user info</h1>
              <Icon>mood_bad</Icon>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
