export interface IYudielQrScannerResult {
  format: number;
  numBits: number;
  rawBytes: Uint8Array;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resultMetadata: Map<any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resultPoints: any[];
  text: string;
  timestamp: number;
}

export interface IYudielQrScannerProps {
  startDecodeOnMount?: boolean;
  setResult?: (result: IYudielQrScannerResult | undefined) => void;
}
