import React, {useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css";
import { toast } from "react-toastify";
import { useSelector,useDispatch} from 'react-redux';
import Select from "../../../../components/Inputs/Select";
import TextField from '../../../../components/Inputs/TextField';
import axiosInstance from '../../../../redux/axiosInstance';





const EditClient = ({ hostelId,points,numberOfGold,hostelName,onClose }) => {
    const { user } = useSelector((state) => state.user);

  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);
	const dispatch = useDispatch();

  const [data, setData] = useState({ 
    points:null,
  });
  const yesOrNo=[
    {name:"Yes",value:true},
    {name:"No",value:false}
 ]

  const handleInputState = (name, value) => {
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      // Value is a valid float
      setData((prevState) => ({
        ...prevState,
        [name]: numericValue,
      }));
    }
  };
  console.log(data)
  const handleErrorState = (name, value) => {
    value === ""
        ? delete errors[name]
        : setErrors({ ...errors, [name]: value });
};
        const handleSubmit = async (e) => {
            e.preventDefault();
            if (Object.keys(errors).length === 0) {
              setIsFetching(true);
              console.log(data)
              const url = process.env.REACT_APP_API_URL + `/GC/${hostelId}/add-points`;
              await axiosInstance.post(url, data);
              setIsFetching(false);
              toast.success("GC points added successfully");
              onClose();
            } else {
                console.log("please fill out properly");
            }
        };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Add GC points: {hostelName}</h2>
        <div className="select-container">
        <form onSubmit={handleSubmit} className="form_container">
          <TextField
            label="Add GC Points"
            name="points"
            placeholder="Add GC Points"
            handleInputState={handleInputState}
            value={data.points}
            error={errors.points}
            type="number"
            step="0.001" // Set the type to "number" to allow float values
            style={{ width: '200px', fontSize: '12px', padding: '4px', height: '40px', background: "transparent", border: "2px solid black", color: "orange" }}
          />
          <div className="form_bottom">
						<button
							type="submit"
							label="Addon Test"
              className="button-17"
              style={{marginLeft:"-5px"}}
							>Update
            </button>
					</div>
				</form>
                <button onClick={onClose} className="button-17" style={{marginTop:"-20px",marginLeft:"280px",fontSize:"13px"}}>Close</button>
        </div>
      </div>
    </div>
  );
};

EditClient.propTypes = {
  clientId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditClient;
