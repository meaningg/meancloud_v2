import React, { useContext, useEffect, useState } from "react";
import { roleContext } from "./contexts/Contexts";
import "../scss/components/adminNews.scss";
import firebaseConfig from "./firebase/config";
import { AuthContext } from "./firebase/Auth";
import firebase from "firebase";
function AdminNews() {
  const [newBlockTitle, setNewBlockTitle] = useState([]);
  const [newBlockText, setNewBlockText] = useState([]);
  const [newBlockImg, setNewBlockImg] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { blocks } = useContext(roleContext);
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);
  const db = firebaseConfig.firestore();
  // test file Upload
  const storage = firebase.storage();
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  //
  const onCreate = (e) => {
    e.preventDefault();
    const db = firebaseConfig.firestore();

    const uploadTask = storage.ref(`/news/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("news")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setURL(url);
          db.collection("blocks").add({
            title: newBlockTitle,
            text: newBlockText,
            img: url,
            date: Date.now(),
            authorName: currentUser.displayName,
            authorImg: currentUser.photoURL,
          });
        });
    });
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  }

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
              ></textarea>
            </div>
          </div>
          <div className="add__body">
            <div className="title">Text</div>
            <div className="input">
              <textarea
                onChange={(e) => setNewBlockText(e.target.value)}
                value={newBlockText}
              ></textarea>
            </div>
          </div>
          <div className="add__body">
            <div className="title">Photo Url</div>
            <div className="input">
              <form className="image__form">
                <label className="input__label">
                  <input
                    className="image__upload"
                    onChange={handleChange}
                    type="file"
                  />
                  {file === null ? "Upload image" : file.name}
                </label>
              </form>
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
            <div key={block.date} className="news__block">
              <img
                className="news__img noselect"
                // Заготовка для полноэкранного просмотра картинок
                onClick={(e) => {
                  console.log(e.target.src);
                }}
                src={block.img}
                alt=""
              />
              <div
                suppressContentEditableWarning={true}
                contentEditable="true"
                onInput={(e) => setTitle(e.currentTarget.textContent)}
                className="news__title"
              >
                {block.title}
              </div>
              <div
                suppressContentEditableWarning={true}
                contentEditable="true"
                onInput={(e) => setText(e.currentTarget.textContent)}
                className="news__text"
              >
                {block.text}
              </div>
              <div className="author__and__date noselect">
                <img src={block.authorImg} alt="" />
                <div className="author__name">{block.authorName}</div>
                <div className="post__date">{convertDate(block.date)}</div>
              </div>
              <div className="delete__btn">
                <button
                  onClick={() => {
                    title != null
                      ? db
                          .collection("blocks")
                          .doc(block.id)
                          .set({ ...block, title })
                          .then(console.log("nice"))
                      : text != null
                      ? db
                          .collection("blocks")
                          .doc(block.id)
                          .set({ ...block, text })
                      : console.log("hmmmm");
                  }}
                >
                  Update
                </button>
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
