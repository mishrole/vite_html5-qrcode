import React from "react";
import CameraScanner from "./components/CameraScanner";
import FileScanner from "./components/FileScanner";
import { EMebjasHtml5QrCodeType, IMebjasHtml5Qrcode } from "./interfaces";
import style from "./style.module.css";

const MebjasHtml5Qrcode: React.FC<IMebjasHtml5Qrcode> = ({
  onSuccess,
  onError
}) => {
  const [scanType, setScanType] = React.useState<EMebjasHtml5QrCodeType>(
    EMebjasHtml5QrCodeType.CAMERA
  );

  // Switch between components
  const switchScanType = () => {
    if (scanType === EMebjasHtml5QrCodeType.CAMERA) {
      setScanType(EMebjasHtml5QrCodeType.FILE);
    }

    if (scanType === EMebjasHtml5QrCodeType.FILE) {
      setScanType(EMebjasHtml5QrCodeType.CAMERA);
    }
  };

  const loadComponent = () => {
    if (scanType === EMebjasHtml5QrCodeType.CAMERA) {
      return <CameraScanner onSuccess={onSuccess} onError={onError} />;
    }

    if (scanType === EMebjasHtml5QrCodeType.FILE) {
      return <FileScanner onSuccess={onSuccess} onError={onError} />;
    }

    return null;
  };

  return (
    <>
      {loadComponent()}

      <button
        type="button"
        onClick={switchScanType}
        className={style.scan__button}
      >
        Escanear usando{" "}
        {scanType === EMebjasHtml5QrCodeType.CAMERA ? "imagen" : "cámara"}
      </button>
    </>
  );
};

export default MebjasHtml5Qrcode;
