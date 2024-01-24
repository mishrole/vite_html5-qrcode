/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const JodusNodusQrReader: React.FC = () => {
  const delay = 500;

  const previewStyle = {
    height: 240,
    width: 320
  };

  const [data, setData] = useState<any>();

  return (
    <>
      <QrReader
        scanDelay={delay}
        videoStyle={previewStyle}
        onResult={(result, error) => {
          if (result) {
            setData(result);
            console.log(result);
          }

          if (error) {
            console.info(error);
          }
        }}
        constraints={{
          facingMode: "user",
          width: { min: 640, ideal: 720, max: 1920 },
          height: { min: 640, ideal: 720, max: 1080 }
        }}
      />

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default JodusNodusQrReader;
