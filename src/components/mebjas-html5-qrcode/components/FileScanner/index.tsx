import classNames from "classnames";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import React from "react";
import { IFileScanner } from "./interfaces";
import style from "./style.module.css";
import { startScanner, stopScanner } from "./utils";

const FileScanner: React.FC<IFileScanner> = ({ onSuccess, onError }) => {
  const [html5Qrcode, setHtml5Qrcode] = React.useState<Html5Qrcode | null>();
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  // Ref for the file input
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!html5Qrcode) {
      return;
    }

    if (e.target.files?.length === 0) {
      return;
    }

    const image = e.target.files?.[0];

    if (!image) {
      return;
    }

    startScanner(html5Qrcode, image, onSuccess, onError);
  };

  // When the user clicks on the button, open the file input
  const handleClick = () => {
    if (!fileInputRef?.current) {
      return;
    }

    fileInputRef.current.click();
  };

  // Drag & Drop

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;

    if (!droppedFiles?.length || !html5Qrcode) {
      return;
    }

    const image = droppedFiles[0];

    startScanner(html5Qrcode, image, onSuccess, onError);
  };

  return (
    <div className={style.container}>
      <div id="reader" className={style.container}></div>
      <img
        alt=""
        width="64"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1OS4wMTggNTkuMDE4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1OS4wMTggNTkuMDE4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJtNTguNzQxIDU0LjgwOS01Ljk2OS02LjI0NGExMC43NCAxMC43NCAwIDAgMCAyLjgyLTcuMjVjMC01Ljk1My00Ljg0My0xMC43OTYtMTAuNzk2LTEwLjc5NlMzNCAzNS4zNjEgMzQgNDEuMzE0IDM4Ljg0MyA1Mi4xMSA0NC43OTYgNTIuMTFjMi40NDEgMCA0LjY4OC0uODI0IDYuNDk5LTIuMTk2bDYuMDAxIDYuMjc3YS45OTguOTk4IDAgMCAwIDEuNDE0LjAzMiAxIDEgMCAwIDAgLjAzMS0xLjQxNHpNMzYgNDEuMzE0YzAtNC44NSAzLjk0Ni04Ljc5NiA4Ljc5Ni04Ljc5NnM4Ljc5NiAzLjk0NiA4Ljc5NiA4Ljc5Ni0zLjk0NiA4Ljc5Ni04Ljc5NiA4Ljc5NlMzNiA0Ni4xNjQgMzYgNDEuMzE0ek0xMC40MzEgMTYuMDg4YzAgMy4wNyAyLjQ5OCA1LjU2OCA1LjU2OSA1LjU2OHM1LjU2OS0yLjQ5OCA1LjU2OS01LjU2OGMwLTMuMDcxLTIuNDk4LTUuNTY5LTUuNTY5LTUuNTY5cy01LjU2OSAyLjQ5OC01LjU2OSA1LjU2OXptOS4xMzggMGMwIDEuOTY4LTEuNjAyIDMuNTY4LTMuNTY5IDMuNTY4cy0zLjU2OS0xLjYwMS0zLjU2OS0zLjU2OCAxLjYwMi0zLjU2OSAzLjU2OS0zLjU2OSAzLjU2OSAxLjYwMSAzLjU2OSAzLjU2OXoiLz48cGF0aCBkPSJtMzAuODgyIDI4Ljk4NyA5LjE4LTEwLjA1NCAxMS4yNjIgMTAuMzIzYTEgMSAwIDAgMCAxLjM1MS0xLjQ3NWwtMTItMTFhMSAxIDAgMCAwLTEuNDE0LjA2M2wtOS43OTQgMTAuNzI3LTQuNzQzLTQuNzQzYTEuMDAzIDEuMDAzIDAgMCAwLTEuMzY4LS4wNDRMNi4zMzkgMzcuNzY4YTEgMSAwIDEgMCAxLjMyMiAxLjUwMWwxNi4zMTMtMTQuMzYyIDcuMzE5IDcuMzE4YS45OTkuOTk5IDAgMSAwIDEuNDE0LTEuNDE0bC0xLjgyNS0xLjgyNHoiLz48cGF0aCBkPSJNMzAgNDYuNTE4SDJ2LTQyaDU0djI4YTEgMSAwIDEgMCAyIDB2LTI5YTEgMSAwIDAgMC0xLTFIMWExIDEgMCAwIDAtMSAxdjQ0YTEgMSAwIDAgMCAxIDFoMjlhMSAxIDAgMSAwIDAtMnoiLz48L3N2Zz4="
      />
      <div
        role="none"
        className={classNames(style.drag_and_drop__container, {
          [style.drag_and_drop__container__dragging]: isDragging
        })}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label htmlFor="qr-input-file">
          <button
            onClick={handleClick}
            className={classNames({
              [style.drag_and_drop__button__dragging]: isDragging
            })}
          >
            Elegir imagen
          </button>
          <input
            ref={fileInputRef}
            type="file"
            id="qr-input-file"
            accept="image/*"
            className={style.input}
            onChange={handleFileChange}
          />
        </label>

        <p>O arrastra y suelta una imagen aquí</p>
      </div>
    </div>
  );
};

export default FileScanner;
