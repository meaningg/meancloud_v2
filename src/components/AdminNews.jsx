import React, { useContext, useEffect, useState } from "react";
import { roleContext } from "./contexts/Contexts";
import "../scss/components/adminNews.scss";
import firebaseConfig from "./firebase/config";
import { AuthContext } from "./firebase/Auth";
function AdminNews() {
  const [newBlockTitle, setNewBlockTitle] = useState([]);
  const [newBlockText, setNewBlockText] = useState([]);
  const [newBlockImg, setNewBlockImg] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { blocks } = useContext(roleContext);
  const db = firebaseConfig.firestore();

  const onCreate = () => {
    const db = firebaseConfig.firestore();
    db.collection("blocks").add({
      title: newBlockTitle,
      text: newBlockText,
      img: newBlockImg,
      date: Date.now(),
      authorName: currentUser.displayName,
      authorImg: currentUser.photoURL,
    });
  };

  return (
    <div className="admin__news">
      <div className="body">
        <div className="news__create">
          <div className="add__body">
            <div className="title">Title</div>
            <div className="input">
              <textarea
                onChange={(e) => setNewBlockTitle(e.target.value)}
                value={newBlockTitle}
                name=""
                id=""
                cols="40"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="add__body">
            <div className="title">Text</div>
            <div className="input">
              <textarea
                onChange={(e) => setNewBlockText(e.target.value)}
                value={newBlockText}
                name=""
                id=""
                cols="40"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="add__body">
            <div className="title">Photo Url</div>
            <div className="input">
              <textarea
                onChange={(e) => setNewBlockImg(e.target.value)}
                value={newBlockImg}
                name=""
                id=""
                cols="40"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="add__body">
            <div className="add__btn">
              <button onClick={onCreate}>Add</button>
            </div>
          </div>
        </div>
        <div className="news__preview">
          {blocks.map((block) => (
            <div key={block.date} className="news__preview__block">
              <div className="preview__block__header">
                <div className="header__image">
                  <img src={block.img} alt="news image" />
                </div>

                <div className="header__title">{block.title}</div>
              </div>
              <div className="preview__block__body">{block.text}</div>
              <div className="delete__btn">
                <button
                  onClick={() => {
                    db.collection("blocks").doc(block.id).delete();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminNews;
