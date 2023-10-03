import {React,useEffect,useState} from 'react'
import styles from "./styles.module.scss"
import { useSelector,useDispatch} from 'react-redux';
import axios from "axios";
import Joi from "joi";
import TextField from "../../../../components/Inputs/TextField";
import Select from "../../../../components/Inputs/Select";
import Radio from "../../../../components/Inputs/Radio"
import Button from "../../../../components/Button";
import {createPatient} from "../../../../redux/patientSlice/apiCalls"

const DataEntry = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({ 
  patientName: "",
  age:"",
  gender: "",
  emailId: "",
  hospitalName: "",
  doctorName: "",
  tests: [{test:""}],
  packages: [{}],
  mobileNumber: ""
});
  const [fetchedTests,setFetchedTests]=useState({})
  const [fetchedPackages,setFetchedPackages]=useState({})
  
	const [errors, setErrors] = useState({});
	const { isFetching } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
  const gender = ["Male", "Female"];
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
      const updatedTests = value.map((testId) => ({
        test: testId
      }));
      setData({ ...data, tests: updatedTests });
    }
    else if (name === "packages") {
      const updatedPackages = value.map((packageId) => ({
        package: packageId
      }));
      setData({ ...data, packages: updatedPackages });
    }

    else {
      setData({ ...data, [name]: value,client:user._id});
      
    }
    
  };
  
  

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors({ ...errors, [name]: value });
	};

	const schema = {
    patientName: Joi.string().required(),
		age: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female").required(),
    hospitalName: Joi.string().allow(""),
    doctorName: Joi.string().allow(""),
    mobileNumber: Joi.string().required(),
    emailId: Joi.string().allow(""),
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
    ),
    totalCost: Joi.number()
	};

      const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        if (Object.keys(errors).length === 0) {
          createPatient(data,dispatch);
        } else {
          console.log("please fill out properly");
        }
      };
  
  return (
    <div className={styles.MainContainer}>
      <div >
        <h1>Book Test (Credit Balance: ₹{user && user.currentBalance})</h1>
        
      </div>
      <div className={styles.btn_body}>
      <button disabled className={styles.btn} >Dhruv Labs</button>
      
      <button disabled className={styles.btn}>Laxminagar,Nagpur</button>
      </div>
      <form onSubmit={handleSubmit} className={styles.form_container}>
					<div className={styles.input_container}>
						<TextField
							label="Patient's Name *"
							placeholder="Enter Patient Name"
							name="patientName"
							handleInputState={handleInputState}
							schema={schema.patientName}
							handleErrorState={handleErrorState}
							value={data.patientName}
							error={errors.patientName}
							required={true}
              style={{width:"230px",fontSize:"14px",padding:"4px",height:"40px"}}
						/>
					</div>
          <div className={styles.input_container1}>
           <TextField
            label="Age"
            placeholder="0"
            name="age"
            handleInputState={
              handleInputState}
            schema={schema.age}
            handleErrorState={handleErrorState}
            value={data.age}
            error={errors.age}
            type="age"
            required={true}
            style={{ width: '70px', fontSize: '12px', padding: '4px', height: '40px' }}
          />
          
					</div>
          <div className={styles.input_container}>
          <Radio
						label="Gender? *"
						name="gender"
						handleInputState={handleInputState}
						options={gender}
						required={true}
					/>
					</div>
          <div className={styles.input_container}>
						<TextField
							label="hospitalName"
							placeholder="Hospital Name"
							name="hospitalName"
							handleInputState={handleInputState}
							schema={schema.hospitalName}
							handleErrorState={handleErrorState}
							value={data.hospitalName}
							error={errors.hospitalName}
							type="HospitalName"
							
              style={{width:"230px",fontSize:"14px",padding:"4px",height:"40px",background:"aliceblue"}}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							label="Mobile Number *"
							placeholder="Mobile Number"
							name="mobileNumber"
							handleInputState={handleInputState}
							schema={schema.mobileNumber}
							handleErrorState={handleErrorState}
							value={data.mobileNumber}
							error={errors.mobileNumber}
							type="mobileNumber"
							required={true}
              style={{width:"230px",fontSize:"14px",padding:"4px",height:"40px"}}
						/>
					</div>
          <div className={styles.input_container}>
						<TextField
							label="Doctor Name"
							placeholder="Doctor Name"
							name="doctorName"
							handleInputState={handleInputState}
							schema={schema.doctorName}
							handleErrorState={handleErrorState}
							value={data.doctorName}
							error={errors.doctorName}
							type="doctorName"
							
              style={{width:"230px",fontSize:"14px",padding:"4px",height:"40px",background:"aliceblue"}}
						/>
					</div>
          <div className={styles.input_container}>
						<TextField
							label="EmailId"
							placeholder="Email id"
							name="emailId"
							handleInputState={handleInputState}
							schema={schema.emailId}
							handleErrorState={handleErrorState}
							value={data.emailId}
							error={errors.emailId}
							type="emailId"
              style={{width:"230px",fontSize:"14px",padding:"4px",height:"40px",background:"aliceblue"}}
						/>
					</div>
          
          <div className={styles.booking}>
							<Select
								name="tests"
                handleInputState={(name, value) => handleInputState("tests", value)}
								label="Tests *"
								placeholder="tests"
								options={fetchedTests}
								value={data.tests.map((test) => test.t)}
								required={true}
                style={{width:"500px",fontSize:"14px",padding:"4px",height:"40px",}}
							/>
              <Select
								name="packages "
								handleInputState={(name, value) => handleInputState("packages", value)}
								label="Packages"
								placeholder="Packages"
								options={fetchedPackages}
								value={data.packages.map((p)=>p.package)}
								required={true}
                style={{width:"200px",fontSize:"14px",padding:"4px",height:"40px",background:"aliceblue"}}
							/>
              
					</div>
          <div className={styles.dashline}>

          </div>
					<div className={styles.form_bottom}>
						<Button
							type="submit"
							label="Book Test"
							isFetching={isFetching}
							style={{ color: "white", background: "#070D59", width: "20rem" }}
						/>
					</div>
				</form>
    </div>
  )
}

export default DataEntry