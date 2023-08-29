import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css";
import axios from "axios";
import { useSelector,useDispatch} from 'react-redux';
import Joi from "joi";
import Select from "../../../../components/Inputs/Select";
import { addOnsToPatient } from '../../../../redux/patientSlice/apiCalls';





const Popup = ({ patientId,patientName,onClose }) => {
    const { user } = useSelector((state) => state.user);
  const [fetchedTests,setFetchedTests]=useState({})
  const [errors, setErrors] = useState({});
	const { isFetching } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
  const [fetchedPackages,setFetchedPackages]=useState({})
  const [data, setData] = useState({ 

    tests: [],
    packages: [],
   
  });


  useEffect(() => {
    fetchOptions();
    fetchPacks();
    
  },[]);

  const fetchOptions = async () => {
    try {
      const url = process.env.REACT_APP_API_URL;
      const response = await axios.get(url + '/tests');
      const responseData = response.data;
  
      if (response.status === 200) {
        const transformedTests = responseData.data.map((test) => ({
          name: test.testName,
          value: test._id,
        }));
        
        setFetchedTests(transformedTests);
      } else {
        console.error('Failed to fetch tests');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const fetchPacks = async () => {
    try {
      const url = process.env.REACT_APP_API_URL;
      const response = await axios.get(url + '/packages');
      const responseData = response.data;
  
      if (response.status === 200) {
        const transformedPackages = responseData.data.map((test) => ({
          name: test.packageName,
          value: test._id,
        }));
        
        setFetchedPackages(transformedPackages);
      } else {
        console.error('Failed to fetch packages');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const handleInputState = (name, value) => {
    if (name === "tests") {
      setData((prevState) => ({
        ...prevState,
        tests: value,
      }));
    } else if (name === "packages") {
      setData((prevState) => ({
        ...prevState,
        packages: value,
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


        const schema ={
            tests: Joi.array().items(
                Joi.object({
                  test: Joi.string().required(),
                  status: Joi.object({
                    recordDate: Joi.date().required(),
                    repeatReason: Joi.string(),
                    status: Joi.string().valid("pending", "success", "rejected").default("pending")
                  })
                })
              ).min(1),
              packages: Joi.array().items(
                Joi.object({
                  package: Joi.string(),
                  status: Joi.object({
                    recordDate: Joi.date().required(),
                    repeatReason: Joi.string().required(),
                    status: Joi.string().valid("pending", "success", "rejected").default("pending")
                  })
                })
              )
        }


        console.log(data)
        const handleSubmit = async (e) => {
		
            e.preventDefault();
        
            if (Object.keys(errors).length === 0) {
                
                addOnsToPatient(patientId,data,dispatch);
                onClose()
            } else {
                console.log("please fill out properly");
            }
        };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Add-Ons for Patient: {patientName}</h2>
        <div className="select-container">
        <form onSubmit={handleSubmit} className="form_container">
                            <Select
								name="tests"
                                handleInputState={(name, value) => handleInputState("tests", value)}
								label="Tests *"
								placeholder="tests"
								options={fetchedTests}
								value={data.tests.map((test) => test.t)}
								required={true}
                                style={{width:"200px",fontSize:"14px",padding:"4px",height:"40px",}}
							/>
                            <Select
								name="packages "
								handleInputState={(name, value) => handleInputState("packages", value)}
								label="Packages"
								placeholder="Packages"
								options={fetchedPackages}
								value={data.packages.map((p)=>p.package)}
								required={true}
                                className="option_select"
                                style={{width:"200px",fontSize:"8px",padding:"4px",height:"40px",background:"aliceblue",color:"black"}}
							/>
                <div className="form_bottom">
						<button
							type="submit"
							label="Addon Test"
                            className="button-17"
                            style={{marginLeft:"-5px"}}
							isFetching={isFetching}
							>AddOn Test</button>
						
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
  patientName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
