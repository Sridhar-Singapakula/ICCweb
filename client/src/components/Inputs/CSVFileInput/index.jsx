import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../../firebase";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import Button from "../../Button";
import styles from "./styles.module.scss";

const CsvFileInput = ({ name, label, handleInputState }) => {
  const inputRef = useRef();
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);

  const handleUpload = () => {
    setProgressShow(true);
    const selectedFile = inputRef.current.files[0];

    if (selectedFile && selectedFile.type === "text/csv") {
      const fileName = new Date().getTime() + selectedFile.name;
      const storageRef = ref(storage, `/csvFiles/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploaded = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(uploaded);
        },
        (error) => {
          console.log(error);
          toast.error("An error occurred while uploading the CSV file.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            handleInputState(name, url);
          });
        }
      );
    } else {
      toast.error("Please select a valid CSV file for upload.");
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        ref={inputRef}
        onChange={() => handleUpload()}
        accept=".csv" // Ensure that only CSV files can be selected
      />
      <Button
        style={{
          width: "15rem",
        }}
        onClick={() => inputRef.current.click()}
        label={label}
      />
      {progressShow && progress < 100 && (
        <div className={styles.progress_container}>
          <CircularProgress
            className={styles.progress}
            variant="determinate"
            value={progress}
          />
          <p>{progress}%</p>
        </div>
      )}
    </div>
  );
};

export default CsvFileInput;
