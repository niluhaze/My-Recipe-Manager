// crops and resizes an image after it has been uploaded, for use

const MAX_WIDTH = 768;
const ASPECT_RATIO = 4 / 3;

export const cropAndResizeImage = (image) => {
  return new Promise(async function (resolve, reject) {
    const originalImage = new Image();

    originalImage.onload = () => {
      const originalWidth = originalImage.naturalWidth;
      const originalHeight = originalImage.naturalHeight;

      let sourceWidth = originalWidth;
      let sourceHeight = originalHeight;
      let sourceOffsetX = 0;
      let sourceOffsetY = 0;

      if (sourceWidth / sourceHeight > ASPECT_RATIO) {
        // if image's aspect ratio is wider than ASPECT_RATIO
        sourceWidth = Math.round(originalHeight * ASPECT_RATIO);
        sourceOffsetX = (originalWidth - sourceWidth) / 2;
      } else {
        // if image's aspect ratio is narrower than ASPECT_RATIO
        sourceHeight = Math.round(originalWidth / ASPECT_RATIO);
        sourceOffsetY = (originalHeight - sourceHeight) / 2;
      }

      // create ofscreen canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // set width to MAX_WIDTH or keep width if image is smaller
      const newWidth = originalWidth > MAX_WIDTH ? MAX_WIDTH : originalWidth;
      const newHeight = Math.round(newWidth / ASPECT_RATIO);

      canvas.width = newWidth;
      canvas.height = newHeight;

      // draw image on canvas
      ctx.drawImage(
        originalImage,
        sourceOffsetX,
        sourceOffsetY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        newWidth,
        newHeight
      );

      resolve(canvas.toDataURL());
    };

    originalImage.src = image;
  });
};
