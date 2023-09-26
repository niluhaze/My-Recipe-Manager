/* 
  A field allowing for image uploads via either click or drag and drop on page "/edit"
*/

// specify imports
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ image, setImage }) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        console.log(reader.result);
        setImage(reader.result); // when loaded, save image to image state variable
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="w-full">
      <input {...getInputProps()} accept=".png, .jpg, .jpeg" />
      <div className="border-b w-full aspect-[4/3] flex flex-col justify-center items-center gap-2">
        {/* if an image has been uploaded, show the image container, else show a button and some info */}
        {image != null && image != "" ? (
          <img
            src={image}
            className="md:rounded-t-2xl object-cover w-full h-full"
          />
        ) : (
          <>
            <p className="cursor-pointer rounded-lg p-2 text-components bg-primary hover:bg-primary-light active:bg-primary-light-light">
              Upload image
            </p>
            <p className="text-neutral-400">or drag an image here...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
