import { MultiFormatReader } from "@zxing/library";
import classNames from "classnames";
import React from "react";
import buttonStyle from "../../styles/button.module.css";
import { convertImageToBinaryBitmap } from "../../utils/convertImageToBinaryBitmap";
import CameraTypeSelector from "../shared/camera-type-selector";
import { ECameraType } from "../shared/camera-type-selector/interfaces";

const ZxingQrFileDecoder: React.FC = () => {
  const [cameraType, setCameraType] = React.useState<ECameraType>(
    ECameraType.ENVIRONMENT
  );
  const [fileToDecode, setFileToDecode] = React.useState<File | undefined>();

  const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = event.target.files?.[0];

    if (!currentFile) {
      return;
    }

    console.info("MISHROLE file", currentFile);

    setFileToDecode(currentFile);
  };

  const handleFileDecode = () => {
    if (!fileToDecode) {
      return;
    }

    convertImageToBinaryBitmap(fileToDecode)
      .then((result) => {
        console.log(result);

        if (result) {
          const reader = new MultiFormatReader();
          const hints = new Map().set("TRY_HARDER", true);
          const decodedInfo = reader.decode(result, hints);

          console.info("MISHROLE result", decodedInfo);
        }
      })
      .catch((error) => {
        console.error(error);
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

      <label htmlFor="fileLoader">Seleccionar imagen</label>
      <input
        type="file"
        accept="image/*"
        capture={cameraType}
        id="fileLoader"
        onChange={handleFileLoad}
      />

      <button
        className={classNames(buttonStyle.button)}
        type="button"
        onClick={handleFileDecode}
      >
        Cargar
      </button>
    </>
  );
};

export default ZxingQrFileDecoder;
