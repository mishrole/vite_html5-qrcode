import React from "react";
import MebjasHtml5Qrcode from "../../components/mebjas-html5-qrcode";
import style from "./style.module.css";

const QrScanDemo: React.FC = () => {
  // const [result, setResult] = useState<IYudielQrScannerResult | undefined>();

  // useEffect(() => {
  //   if (result) {
  //     console.log(result);
  //   }
  // }, [result]);

  const onSuccess = (decodedText: string) => {
    console.log(decodedText);
  };

  const onError = (errorMessage: string) => {
    console.log(errorMessage);
  };

  return (
    <div className={style.container}>
      {/* <YudielQrScanner setResult={setResult} />

      <div>{result?.text}</div>

      <ZxingQrFileDecoder /> */}

      <MebjasHtml5Qrcode onSuccess={onSuccess} onError={onError} />
    </div>
  );
};

export default QrScanDemo;
