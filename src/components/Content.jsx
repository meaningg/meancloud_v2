import React, { useEffect, useState } from "react";
import "../scss/components/Content.scss";
import Fade from "react-reveal/Fade";
import { AuthContext } from "./firebase/Auth";
import { roleContext } from "./contexts/Contexts";
import firebaseConfig from "./firebase/config";
function Content() {
  const { currentUser } = React.useContext(AuthContext);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebaseConfig.firestore();
      const data = await db
        .collection("blocks")
        .orderBy("date", "desc")
        .limit(4)
        .get();
      setBlocks(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  }
  // convertDate(blocks.date) - использование конвертора даты;
  return (
    <div>
      <div className="content__container ">
        <div className="body ">
          <div className="title noselect">Hi, {currentUser.displayName}</div>
          <div className="title subtitle noselect">News</div>
          <div className="news__blocks ">
            {blocks.map((block) => (
              <Fade mountOnEnter unmountOnExit>
                <div key={block.date} className="news__block">
                  <img className="news__img noselect" src={block.img} alt="" />
                  <div className="news__title">{block.title}</div>
                  <div className="news__text">{block.text}</div>
                  <div className="author__and__date noselect">
                    <img src={block.authorImg} alt="" />
                    <div className="author__name">{block.authorName}</div>
                    <div className="post__date">{convertDate(block.date)}</div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
          <div className="title subtitle noselect">More stuff</div>
          <div className="info__blocks ">
            <Fade mountOnEnter unmountOnExit delay={300}>
              <div className="about__block noselect">
                <div className="title">About</div>
                <div className="text ">
                  Yo, this is nice and sweet music stream service. <br />
                </div>
              </div>
            </Fade>
            <Fade mountOnEnter unmountOnExit delay={500}>
              <div className="more__block noselect">
                <div className="title ">More</div>
                <div className="text ">
                  You can hear a cool collection of few nice genres <br /> and
                  see cool news of music industry
                </div>
              </div>
            </Fade>
            <Fade mountOnEnter unmountOnExit delay={750}>
              <div className="by__block noselect">
                <div className="title ">Created by</div>
                <div className="text">mean.ing</div>
              </div>
            </Fade>
            <Fade mountOnEnter unmountOnExit delay={600}>
              <div className="contactdetails__block">
                <div className="title noselect">Contact details</div>
                <div className="text">
                  Email: Thomassred@gmail.com <br /> Telegram: @meaningfulway
                </div>
              </div>
            </Fade>
          </div>
          <div className="news__body">
            {blocks.map((block) => (
              <div className="news__block"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
