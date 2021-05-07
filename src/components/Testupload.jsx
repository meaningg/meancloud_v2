import React, { useState } from "react";
import firebase from "firebase";
import "../scss/components/testUpload.scss";
import $ from "jquery";
function Testupload() {
  const storage = firebase.storage();
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
        });
    });
  }
  console.log(file);
  return (
    <div>
      <div className="test__upload">
        {" "}
        <form onSubmit={handleUpload}>
          <label>
            <input type="file" onChange={handleChange} />
            {file === null ? "Upload image" : file.name}
          </label>
          <button disabled={!file}>upload to firebase</button>
        </form>
        <img src={url} alt="" />
      </div>
    </div>
  );
}

export default Testupload;
