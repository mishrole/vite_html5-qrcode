export interface IFileScanner {
  onSuccess: (decodedText: string) => void;
  onError: (errorMessage: string) => void;
}
