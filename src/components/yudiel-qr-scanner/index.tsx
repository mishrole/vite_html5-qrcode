import { QrScanner } from "@yudiel/react-qr-scanner";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import CameraTypeSelector from "../shared/camera-type-selector";
import { ECameraType } from "../shared/camera-type-selector/interfaces";
import { DEFAULT_CONFIG } from "./constants";
import { IYudielQrScannerProps } from "./interfaces";
import style from "./style.module.css";

const YudielQrScanner: React.FC<IYudielQrScannerProps> = ({
  startDecodeOnMount = false,
  setResult = () => {}
}) => {
  const [stop, setStop] = useState<boolean>(!startDecodeOnMount);
  const [cameraType, setCameraType] = useState<ECameraType>(
    ECameraType.ENVIRONMENT
  );

  useEffect(() => {
    return () => {
      setStop(true);
    };
  }, []);

  const handleDecode = (decode: string) => {
    console.log(decode);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResult = (fullResult: any) => {
    if (fullResult) {
      setResult(fullResult);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any) => {
    console.error("Error on scan", error);
  };

  const stopScan = () => {
    setStop((prev) => {
      const newStop = !prev;

      if (newStop) {
        setResult(undefined);
      }

      return newStop;
    });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <CameraTypeSelector
          cameraType={cameraType}
          setCameraType={setCameraType}
        />
      </div>

      <QrScanner
        onDecode={handleDecode}
        onResult={handleResult}
        onError={handleError}
        stopDecoding={stop}
        {...DEFAULT_CONFIG(cameraType)}
      />

      <button
        className={classNames(style["button-primary"], {
          [style.stop]: !stop,
          [style.start]: stop
        })}
        type="button"
        onClick={stopScan}
      >
        {!stop ? "Detener" : "Empezar"}
      </button>
    </>
  );
};

export default YudielQrScanner;
