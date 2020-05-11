import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Preloader component to render the preloading icon
const Preloader = (props) => {
  return (
    <div className={"preloader" + (props.styleName)}>
      <p>Loading</p>
        <FontAwesomeIcon icon={faSpinner} className="preloader" />
    </div>
  );
};

export default Preloader;
