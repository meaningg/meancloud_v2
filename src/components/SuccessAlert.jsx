import React from "react";
import "../scss/components/alerts.scss";
import Fade from "react-reveal/Fade";
function SuccessAlert({ children, error, success }) {
  return (
    <div className="success__container">
      <Fade when={success} duration={200}>
        <div className="success__alert__body">{children}</div>
      </Fade>
    </div>
  );
}

export default SuccessAlert;
