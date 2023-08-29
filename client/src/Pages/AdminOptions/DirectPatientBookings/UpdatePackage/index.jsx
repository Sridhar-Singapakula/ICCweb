import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css";
import { useSelector,useDispatch} from 'react-redux';
import Select from "../../../../components/Inputs/Select";
import TextField from '../../../../components/Inputs/TextField';
import { updatePackageStatusOfDirect } from '../../../../redux/patientSlice/apiCalls';





const Popup = ({ patientId,packageId,onClose }) => {
    const { user } = useSelector((state) => state.user);

  const [errors, setErrors] = useState({});
	const { isFetching } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
    const statusOptions=[
        {name:"success",value:"success"},
        {name:"rejected",value:"rejected"}
     ]

  const [data, setData] = useState({ 
    packageId:packageId,
    status:"",
    repeatReason:""
  });
     
   


  const handleInputState = (name, value) => {
    if (name === "status") {
        const firstStatus = Array.isArray(value) ? value[0] : "";
        setData((prevState) => ({
          ...prevState,
          status: firstStatus,
        }));
      } else if (name === "repeatReason") {
      setData((prevState) => ({
        ...prevState,
        repeatReason: value,
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const handleErrorState = (name, value) => {
    value === ""
        ? delete errors[name]
        : setErrors({ ...errors, [name]: value });
};
   


        console.log(data)
        const handleSubmit = async (e) => {
		
            e.preventDefault();
        
            if (Object.keys(errors).length === 0) {
                
                updatePackageStatusOfDirect(patientId,data,dispatch);
                onClose()
            } else {
                console.log("please fill out properly");
            }
        };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Update Package Status for Patient: {patientId}</h2>
        <div className="select-container">
        <form onSubmit={handleSubmit} className="form_container">
                            <Select
								name="status"
                                handleInputState={(name, value) => handleInputState("status", value)}
								label="Status *"
								placeholder="Status"
								options={statusOptions}
								value={data.status}
								required={true}
                                isMulti={false}
                                style={{width:"200px",fontSize:"14px",padding:"4px",height:"40px",}}
							/>
                            {data.status[0]==="rejected" && <TextField
                                                            label="rejected? what is the reason"
                                                            placeholder="repeat Reason"
                                                            name="repeatReason"
                                                            handleInputState={handleInputState}
                                                            handleErrorState={handleErrorState}
                                                            value={data.repeatReason}
                                                            error={errors.repeatReason}
                                                            type="repeatReason"
                                                            
                                            style={{width:"230px",fontSize:"14px",padding:"4px",height:"40px",background:"aliceblue"}}
						/>}
                        
                <div className="form_bottom">
						<button
							type="submit"
							label="Addon Test"
                            className="button-17"
                            style={{marginLeft:"-5px"}}
							isFetching={isFetching}
							>Update Status</button>
						
					</div>
				</form>
                <button onClick={onClose} className="button-17" style={{marginTop:"-20px",marginLeft:"280px",fontSize:"13px"}}>Close</button>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  patientId: PropTypes.string.isRequired,
  testId:PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
