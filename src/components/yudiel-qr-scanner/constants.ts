export const DEFAULT_CONFIG = (cameraType = "environment") => {
  return {
    constraints: {
      facingMode: cameraType,
      width: { min: 640, ideal: 720, max: 1920 },
      height: { min: 640, ideal: 720, max: 1080 }
    },
    hideCount: true,
    tracker: true,
    scanDelay: 500
  };
};

export const CONTAINER_STYLES = {
  width: 400,
  margin: "auto"
};
