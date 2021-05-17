import React, { useState, useEffect, useContext } from "react";
import "../scss/components/adminPlaylists.scss";
import firebaseConfig from "./firebase/config";
import parse from "html-react-parser";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import PlaylistsInput from "./PlaylistsInput";
import { roleContext } from "./contexts/Contexts";
function AdminPlaylists() {
  const [genre, setGenre] = useState(null);
  const [playListEmbed, setPlayListEmbed] = useState(null);
  const { playLists } = useContext(roleContext);
  const db = firebaseConfig.firestore();
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [successAlert, setSuccessAlert] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [plstEmbed, setPlstEmbed] = useState([]);

  const onCreate = (e) => {
    e.preventDefault();

    const db = firebaseConfig.firestore();

    if (
      genre !== null &&
      genre !== "noselected" &&
      genre !== "" &&
      playListEmbed != null &&
      playListEmbed.includes("<iframe")
    ) {
      const playerSrc = parse(playListEmbed);
      db.collection("musicEmbed").doc(genre).set({
        genreName: genre,
      });
      db.collection("musicEmbed")
        .doc(genre)
        .collection("Playlists")
        .add({
          src: playerSrc.props.src,
        })
        .then(() => {
          setIsSuccess(true);
          setSuccessAlert("Playlist added");
          setTimeout(() => {
            setIsSuccess(false);
          }, 2500);
        });
    } else {
      console.log("wrong genre");
      setError("Wrong genre or embed link");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2500);
    }
  };

  return (
    <div className="admin__playlists">
      <div className="body">
        <ErrorAlert error={isError}>{error}</ErrorAlert>
        <SuccessAlert success={isSuccess}>{successAlert}</SuccessAlert>
        <div className="playlists__create">
          <form>
            <div className="input">
              <div className="playlist__input">
                <div className="title">Playlists</div>
                <input
                  placeholder="<iframe/>"
                  onChange={(e) => {
                    setPlayListEmbed(e.target.value);
                  }}
                  type="text"
                />
              </div>
              <div className="playlist__input">
                <div className="title">Add genre(optional)</div>
                <input
                  placeholder="Write genre name here"
                  onChange={(e) => {
                    setGenre(e.target.value);
                  }}
                  type="text"
                />
              </div>
              <div className="select">
                <div className="title">Genres</div>
                <select
                  onChange={(e) => {
                    setGenre(e.target.value);
                  }}
                  placeholder="Select genre"
                  name="Genres"
                  id="Genres"
                >
                  <option value="noselected">Select genre</option>
                  {playLists.map((ref) => (
                    <option value={ref.id}>{ref.id}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="add__btn">
              <button onClick={onCreate}>Add</button>
            </div>
          </form>
        </div>
        <div className="playlists__list__body">
          {playLists.map((ref) => (
            <div className="genres__body">
              <div className="title">{ref.id}</div>
              <div className="genres__container">
                <PlaylistsInput btnDisabled={false} nameGenre={ref.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPlaylists;
