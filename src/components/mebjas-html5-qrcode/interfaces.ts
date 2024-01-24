export interface IMebjasHtml5Qrcode {
  onSuccess: (decodedText: string) => void;
  onError: (errorMessage: string) => void;
}

export enum EMebjasHtml5QrCodeType {
  CAMERA = 1,
  FILE = 2
}
