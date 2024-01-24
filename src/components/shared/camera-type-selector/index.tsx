import classNames from "classnames";
import React from "react";
import { ECameraType, ICameraTypeSelector } from "./interfaces";
import style from "./style.module.css";

const CameraTypeSelector: React.FC<ICameraTypeSelector> = ({
  cameraType = ECameraType.ENVIRONMENT,
  setCameraType,
  isReady = true
}) => {
  const handleCameraType = () => {
    if (cameraType === ECameraType.ENVIRONMENT) {
      setCameraType(ECameraType.USER);
    }

    if (cameraType === ECameraType.USER) {
      setCameraType(ECameraType.ENVIRONMENT);
    }
  };

  return isReady ? (
    <div className={style.container__floating}>
      <button
        className={classNames(style.button)}
        type="button"
        onClick={handleCameraType}
      >
        {/* Usar cámara
      {cameraType === ECameraType.USER ? " trasera" : " frontal"} */}

        <svg
          fill="#fff"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z" />
        </svg>
      </button>
    </div>
  ) : null;
};

export default CameraTypeSelector;
