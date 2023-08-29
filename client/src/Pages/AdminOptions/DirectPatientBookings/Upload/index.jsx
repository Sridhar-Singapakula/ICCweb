import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css";
import axiosInstance from '../../../../redux/axiosInstance';
import { useSelector} from 'react-redux';

import FileInput from '../../../../components/Inputs/FileInput';
import { toast } from "react-toastify";

const Upload = ({ patientId, onClose }) => {
  const { user } = useSelector((state) => state.user);
  const [isFetching, setIsFetching] = useState(false);



  const [formData, setFormData] = useState({ 
    report: "",
  });

  const handleInputState = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/directPatient/editByAdmin/${patientId}`;
      console.log(formData);
       await axiosInstance.patch(url, formData);
      toast.success("Uploaded report");
      setIsFetching(false);
      window.location.reload();
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Update Report of Patient: {patientId}</h2>
          
            <div>
            <FileInput
            label="Choose PDF"
            type="pdf"
            name="report"
            value={formData.report}
            handleInputState={handleInputState}
          />
            </div>
            <div className="form_bottom">
              <button
                onClick={handleSubmit}
                label="Addon Test"
                className="button-17"
                style={{ marginLeft: "-5px" }}
              >
                Upload Report
              </button>
            </div>
        
          <button
            onClick={onClose}
            className="button-17"
            style={{ marginTop: "-20px", marginLeft: "280px", fontSize: "13px" }}
          >
            Close
          </button>
        </div>
      </div>

  );
};

Upload.propTypes = {
  patientId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Upload;
