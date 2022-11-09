import { useState } from "react";

interface Props {
  updateFileUrl: React.Dispatch<React.SetStateAction<string>>;
}

const UploadImage: React.FC<Props> = ({updateFileUrl}) => {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          if (event.target.files !== null) {
            if (event.target.files[0].type === "application/pdf") {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
              updateFileUrl(event.target.files[0].name);
            } else {
              console.log("File is not pdf");
            }
          } else {
            console.log("error");
          }
        }}
      />
      <br />
      {selectedImage && (
        <div>
          <br/>
          <embed src={URL.createObjectURL(selectedImage)}/>
        </div>
      )}      
    </div>
  );
};

export default UploadImage;