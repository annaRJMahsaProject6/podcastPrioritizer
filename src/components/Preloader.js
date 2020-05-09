import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Preloader = () => {
  return (
    <div className="preloaderContainer">
      <p>Loading</p>
        <FontAwesomeIcon icon={faSpinner} className="preloader" />
    </div>
  );
};

export default Preloader;
