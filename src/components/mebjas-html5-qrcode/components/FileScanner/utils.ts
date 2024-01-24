import { Html5Qrcode } from "html5-qrcode";

export const startScanner = async (
  html5Qrcode: Html5Qrcode,
  image: File,
  onSuccess: (decodedText: string) => void,
  onError: (errorMessage: string) => void
) => {
  try {
    const result = await html5Qrcode.scanFile(image, false);

    onSuccess(result);
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
