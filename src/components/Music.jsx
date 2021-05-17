import React, { useContext } from "react";
import "../scss/components/music.scss";
import PlaylistsInput from "./PlaylistsInput";
import { roleContext } from "./contexts/Contexts";
function Music() {
  const { playLists } = useContext(roleContext);

  return (
    <div className="music__container">
      <div className="music__header">Music</div>
      <div className="music__welcome">Тут буит че-то</div>
      <div className="music__body">
        {" "}
        {playLists.map((ref) => (
          <div className="genres__body">
            <div className="title">{ref.id}</div>
            <div className="genres__container">
              <PlaylistsInput btnDisabled={true} nameGenre={ref.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Music;
