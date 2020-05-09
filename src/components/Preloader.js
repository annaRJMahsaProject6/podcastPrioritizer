import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Preloader = (props) => {
  return (
    <div className={"preloader" + (props.styleName)}>
      <p>Loading</p>
        <FontAwesomeIcon icon={faSpinner} className="preloader" />
    </div>
  );
};

export default Preloader;
