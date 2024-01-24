export const convertToUint8ClampedArray = (
  uint8Array: Uint8Array,
  width: number,
  height: number
) => {
  const length = width * height * 4; // 4 bytes por píxel (RGBA)
  const uint8ClampedArray = new Uint8ClampedArray(length);

  for (let i = 0, j = 0; i < length; i += 4, j += 3) {
    // Asegurar que los valores estén en el rango de 0 a 255
    uint8ClampedArray[i] = Math.min(255, Math.max(0, uint8Array[j])); // rojo
    uint8ClampedArray[i + 1] = Math.min(255, Math.max(0, uint8Array[j + 1])); // verde
    uint8ClampedArray[i + 2] = Math.min(255, Math.max(0, uint8Array[j + 2])); // azul
    uint8ClampedArray[i + 3] = 255; // alfa (normalmente se establece en 255)
  }

  return uint8ClampedArray;
};
