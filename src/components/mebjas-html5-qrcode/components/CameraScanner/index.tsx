import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import React from "react";
import CameraTypeSelector from "../../../shared/camera-type-selector";
import { ECameraType } from "../../../shared/camera-type-selector/interfaces";
import { ICameraScanner } from "./interfaces";
import style from "./style.module.css";
import { startScanner, stopScanner } from "./utils";

const CameraScanner: React.FC<ICameraScanner> = ({ onSuccess, onError }) => {
  const [html5Qrcode, setHtml5Qrcode] = React.useState<Html5Qrcode | null>();
  const [isReady, setIsReady] = React.useState<boolean>(false);
  const [cameraType, setCameraType] = React.useState<ECameraType>(
    ECameraType.ENVIRONMENT
  );

  React.useEffect(() => {
    const init = new Html5Qrcode("reader");

    setHtml5Qrcode(init);

    return () => {
      if (init && init.getState() === Html5QrcodeScannerState.SCANNING) {
        stopScanner(init);
        setHtml5Qrcode(null);
      }
    };
  }, []);

  // Start scanner when html5Qrcode is ready
  React.useEffect(() => {
    if (!html5Qrcode) {
      return;
    }

    startScanner(html5Qrcode, cameraType, onSuccess, onError).then(() =>
      setIsReady(true)
    );
  }, [html5Qrcode, cameraType, onSuccess, onError]);

  const handleCameraSwitch = (cameraType: ECameraType) => {
    if (!html5Qrcode) {
      return;
    }

    stopScanner(html5Qrcode).then(() => {
      setIsReady(false);
      setCameraType(cameraType);
    });
  };

  return (
    <div
      style={{
        position: "relative"
      }}
    >
      <CameraTypeSelector
        cameraType={cameraType}
        setCameraType={handleCameraSwitch}
        isReady={isReady}
      />
      <div id="reader" className={style.container}></div>
    </div>
  );
};

export default CameraScanner;
