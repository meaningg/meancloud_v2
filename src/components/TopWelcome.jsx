import React from "react";
import "../scss/components/TopWelcome.scss";
import welcimg from "../source/img/welc.svg";
import { Parallax } from "react-parallax";
import ParticlesBg from "particles-bg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link as ScrLink, animateScroll as scroll } from "react-scroll";
function TopWelcome() {
  return (
    <div>
      <div className="topwelcome__container noselect">
        <div className="body">
          <ScrLink
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            to="testscrl"
          >
            <div className="arrow__down">
              <FontAwesomeIcon
                className="arrow__down__properties"
                icon={faChevronDown}
              />
            </div>
          </ScrLink>
          <div className="welc__bg">
            <ParticlesBg num={25} type="cobweb" bg={true} />
          </div>
          <Parallax bgImage={welcimg} strength={500}>
            <div className="welc__img">
              <div className="welc__text">
                <span>welcome to</span>
                <br />
                <span>MEANCLOUD</span>
              </div>
            </div>
          </Parallax>
        </div>
      </div>
      <div id="testscrl"></div>
    </div>
  );
}

export default TopWelcome;
