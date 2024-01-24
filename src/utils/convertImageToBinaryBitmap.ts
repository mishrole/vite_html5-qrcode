import {
  BinaryBitmap,
  HybridBinarizer,
  RGBLuminanceSource
} from "@zxing/library";

export const convertImageToBinaryBitmap = async (currentFile: File) => {
  try {
    const arrayBuffer = await currentFile.arrayBuffer();

    const img = new Image();
    img.src = URL.createObjectURL(currentFile);

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    console.info("MISHROLE img", img, img.width, img.height);

    const uint8ClampedArray = new Uint8ClampedArray(arrayBuffer);

    console.info("MISHROLE uint8ClampedArray", uint8ClampedArray);

    const luminanceSource = new RGBLuminanceSource(
      uint8ClampedArray,
      img.width,
      img.height
    );

    console.info("MISHROLE luminanceSource", luminanceSource);

    const binarizer = new HybridBinarizer(luminanceSource);
    const binaryBitmap = new BinaryBitmap(binarizer);

    return binaryBitmap;
  } catch (error) {
    console.error(error);
  }
};
