export type TCameraType = "environment" | "user";

export enum ECameraType {
  ENVIRONMENT = "environment",
  USER = "user"
}

export interface ICameraTypeSelector {
  cameraType?: ECameraType;
  setCameraType: (cameraType: ECameraType) => void;
  isReady?: boolean;
}
