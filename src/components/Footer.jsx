import React from "react";
import logo from "../media/TMDB.png";
import tofu from "../media/SilkenTofu.png";


const Footer = () => {

  return (
    <footer>
      <a href="https://www.themoviedb.org/?language=en-GB">
        <img
          className="logo"
          src={logo}
          alt="TMDB logo"
          target="_blank"
          rel="noreferrer"
        />
      </a>

      <a href="https://github.com/cruickshankrpc">
        <img
          className="tofu"
          src={tofu}
          alt="Silken Tofu"
          target="_blank"
          rel="noreferrer"
        />
      </a>
    </footer>
  );
};

export default Footer;
