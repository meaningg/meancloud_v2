import React, { useState, useEffect } from "react";
import "../scss/components/adminPlaylists.scss";
import firebaseConfig from "./firebase/config";
function PlaylistsInput({ nameGenre, btnDisabled }) {
  const [playLists, setPlayLists] = useState([]);
  const db = firebaseConfig.firestore();
  useEffect(() => {
    const db = firebaseConfig.firestore();
    return db
      .collection("musicEmbed")
      .doc(nameGenre)
      .collection("Playlists")
      .onSnapshot((snapshot) => {
        const playListsData = [];

        snapshot.forEach((doc) =>
          playListsData.push({ ...doc.data(), id: doc.id })
        );
        setPlayLists(playListsData);
      });
  }, []);

  return (
    <div className="genres__container">
      {playLists.map((doc) => (
        <div className="genres__player">
          <iframe src={doc.src} seamless></iframe>
          <button
            onClick={() => {
              db.collection("musicEmbed")
                .doc(nameGenre)
                .collection("Playlists")
                .doc(doc.id)
                .delete();
            }}
            className={btnDisabled ? "disabled" : ""}
          >
            Delete
          </button>
        </div>
      ))}
      <hr />
    </div>
  );
}

export default PlaylistsInput;
