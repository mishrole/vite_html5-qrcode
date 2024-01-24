export interface ICameraScanner {
  onSuccess: (decodedText: string) => void;
  onError: (errorMessage: string) => void;
}
