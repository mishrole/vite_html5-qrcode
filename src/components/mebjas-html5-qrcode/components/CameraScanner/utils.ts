import { Html5Qrcode } from "html5-qrcode";
import { ECameraType } from "../../../shared/camera-type-selector/interfaces";
import { CAMERA_CONFIG } from "./constants";

export const startScanner = async (
  html5Qrcode: Html5Qrcode,
  cameraType: ECameraType,
  onSuccess: (decodedText: string) => void,
  onError: (errorMessage: string) => void
) => {
  const constraints = {
    facingMode: cameraType
  };

  const successCallback = (decodedText: string) => {
    onSuccess(decodedText);
  };

  try {
    // IMPORTANT: Don't use qrCodeErrorCallback to set an state, it will be called multiple times while the camera is looking for a QR code to scan and it will cause a lot of re-renders
    await html5Qrcode.start(
      constraints,
      CAMERA_CONFIG,
      successCallback,
      undefined
    );
  } catch (error) {
    onError(`${error}`);
  }
};

export const stopScanner = async (html5Qrcode: Html5Qrcode) => {
  try {
    await html5Qrcode.stop();
    html5Qrcode.clear();
  } catch (error) {
    console.error(error);
  }
};
