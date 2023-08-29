import React, {  useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css";
import axiosInstance from '../../../../redux/axiosInstance';
import { useSelector} from 'react-redux';
import TextField from '../../../../components/Inputs/TextField';
import { toast } from "react-toastify";

const EditTest = ({ testId, onClose }) => {
  const { user } = useSelector((state) => state.user);
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({ 
    testName:"",
    mrp:"",
    sampleType:"",
    collectionTube:""
  });

  const handleInputState = (name, value) => {
     
    setData((prev) => ({ ...prev, [name]: value }));
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/tests/${testId}`;
      const response = await axiosInstance.put(url, data);
      toast.success("Updated test");
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
    
            <div>
                    <TextField
						label=" testName?"
                        name="testName"
						placeholder="Enter  testName"
                        handleInputState={handleInputState}
						value={data.testName}
                        error={errors.testName}
                        type="testName"
						
						style={{ width: '200px', fontSize: '12px', padding: '4px', height: '25px', background:"",border:"1px solid black",color:"black"}}
					/>
            </div>
            <div>
                    <TextField
						label=" mrp?"
                        name="mrp"
						placeholder="Enter mrp"
                        handleInputState={handleInputState}
						value={data.mrp}
                        error={errors.mrp}
                        type="mrp"
                        inputMode="numeric"
						style={{ width: '200px', fontSize: '12px', padding: '4px', height: '25px', background:"",border:"1px solid black",color:"black"}}
					/>
            </div>
            <div>
                    <TextField
						label=" b2b?"
                        name="b2b"
						placeholder="Enter your Lab b2b"
                        handleInputState={handleInputState}
						value={data.b2b}
                        error={errors.b2b}
                        type="b2b"
						inputMode="numeric"
						style={{ width: '200px', fontSize: '12px', padding: '4px', height: '25px', background:"",border:"1px solid black",color:"black"}}
					/>
            </div>
            <div>
                    <TextField
						label=" sampleType?"
                        name="sampleType"
						placeholder="Enter your Lab sampleType"
                        handleInputState={handleInputState}
						value={data.sampleType}
                        error={errors.sampleType}
                        type="sampleType"
						
						style={{ width: '200px', fontSize: '12px', padding: '4px', height: '25px', background:"",border:"1px solid black",color:"black"}}
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

EditTest.propTypes = {
  testId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditTest;
