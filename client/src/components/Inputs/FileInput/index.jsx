import { useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import Button from "../../Button";
import styles from "./styles.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const FileInput = ({
  name,
  label,
  value,
  type,
  handleInputState,
  ...rest
}) => {
  const inputRef = useRef();
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);

  const handleUpload = () => {
    setProgressShow(true);

    const formData = new FormData();
    formData.append("file", value);

    fetch(process.env.REACT_APP_API_URL+"/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          handleInputState(name, data.imageUrl); // Set the uploaded image URL
        } else {
          toast.error("An error occurred while uploading!");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while uploading!");
      });
  };

  
	return (
	  <div className={styles.container}>
		<input
		  type="file"
		  ref={inputRef}
		  onChange={(e) =>
			handleInputState(name, e.currentTarget.files[0])
		  }
		  {...rest}
		/>
		<Button
		  style={{
			width: "15rem",
		  }}
		  onClick={() => inputRef.current.click()}
		  label={label}
		/>
		{type === "pdf" && value && (
        <embed
          src={typeof value === "string" ? value : URL.createObjectURL(value)}
          type="application/pdf"
          width="20px"
          height="20px"
        />
		)}
		{type === "image" && value && (
        <img
          src={value} // Set the image URL as the source
          alt="Uploaded Image"
        />
      )}
		{value !== null && !progressShow && typeof value !== "string" && (
				<Button
					onClick={handleUpload}
					label="Upload"
					style={{ width: "10rem" }}
				/>
			)}
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
		{progress === 100 && (
		  <div className={styles.progress_container}>
			<CheckCircleIcon className={styles.success} />
		  </div>
		)}
	  </div>
	);
  };
  
  export default FileInput;
  
