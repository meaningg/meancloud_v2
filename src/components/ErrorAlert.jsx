import React from "react";
import "../scss/components/alerts.scss";
import Fade from "react-reveal/Fade";
function ErrorAlert({ children, error }) {
  return (
    <div className="error__container">
      <Fade when={error} duration={200}>
        <div className="error__alert__body">{children}</div>
      </Fade>
    </div>
  );
}

export default ErrorAlert;
