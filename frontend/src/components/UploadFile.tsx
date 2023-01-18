import { useState } from "react";

interface Props {
  updateFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  createClient: () => Promise<void>;
}

const UploadFile: React.FC<Props> = ({updateFile, createClient}) => {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);

  return (
    <div>
      <input
        className="fileSelector"
        type="file"
        onChange={(event) => {
          if (event.target.files !== null) {
            if (event.target.files[0].type === "application/pdf") {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
              updateFile(event.target.files[0]);
              createClient();
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
          <embed src={URL.createObjectURL(selectedImage)} className="pdfView"/>
        </div>
      )}      
    </div>
  );
};

export default UploadFile;