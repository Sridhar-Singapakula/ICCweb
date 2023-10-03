import {React,useEffect,useState } from "react";
import {useSelector } from "react-redux";
import Joi from "joi";
import axios from "axios";
import TextField from "../../components/Inputs/TextField";
import Select from "../../components/Inputs/Select";
import Radio from "../../components/Inputs/Radio";
import Checkbox from "../../components/Inputs/Checkbox";
import Button from "../../components/Button";
import styles from "./styles.module.scss";
import { Link, useHistory } from "react-router-dom";
import logo from "../../img/images/logo.png";
import { toast } from "react-toastify";




const DirectPatient = () => {
	const [patientData, setPatientData] = useState({
		patientName: "",
		age: "",
		gender: "",
		mobileNumber:"",
		emailId:"",
		tests:[{test:""}],
		packages:[],
		address:"",
	});
  const { isFetching } = useSelector((state) => state.auth);
    const [fetchedTests,setFetchedTests]=useState({})
    const [fetchedPackages,setFetchedPackages]=useState({})

	const [errors, setErrors] = useState({});
    const gender = ["Male", "Female"];
    const history = useHistory();
  

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
          setPatientData({ ...patientData, tests: updatedTests });
        }
        else if (name === "packages") {
          const updatedPackages = value.map((packageId) => ({
            package: packageId
          }));
          setPatientData({ ...patientData, packages: updatedPackages });
        }
    
        else {
          setPatientData({ ...patientData, [name]: value});
          
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
        mobileNumber: Joi.string().required(),
        emailId: Joi.string().required(),
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



        useEffect(() => {
            fetchOptions();
            fetchPacks();
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);
        
            return () => {
              document.body.removeChild(script);
            };
          }, []);
        
          const initPayment = (paymentData) => {
            const options = {
              key: process.env.KEY_ID,
              amount: paymentData.amount,
              currency: paymentData.currency,
              name: paymentData.patientName,
              description: 'Test Transaction',
              image: {logo},
              order_id: paymentData.id,
              
              handler: async (response) => {
                try {
                  const verifyUrl = process.env.REACT_APP_API_URL+'/directPatient/verify';
                  const { data } = await axios.post(verifyUrl, {response,
                                    tests:patientData.tests,
                                    packages:patientData.packages,
                                    patientName:patientData.patientName,
                                    age:patientData.age,
                                    gender:patientData.gender,
                                    mobileNumber:patientData.mobileNumber,
                                    emailId:patientData.emailId,
                                    totalCost:paymentData.amount/100,
                                    address:patientData.address
                                });
                } catch (error) {
                  console.log(error);
                }
              },
              theme: {
                color: '#3399cc',
              },
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
          }; 
      const handlePayment = async (e) => {
        e.preventDefault();
        if(Object.keys(errors).length === 0){
          try {
         
            const orderUrl = process.env.REACT_APP_API_URL+'/directPatient/order';
            const { data } = await axios.post(orderUrl, patientData);
            toast.success("Booked Tests successfully");
            initPayment(data.data);
            history.push("/");
          
          } catch (error) {
            console.log(error);
          }
        }
            
          };



	return (
		<div className={styles.container}>
      <Link to="/" style={{ display: "block" }}>
          <a href="/" className="logo me-auto">
            <img src={logo} className="logo_img" alt="" />
          </a>
          <a style={{ fontSize: "25px", marginRight: "18px",fontWeight:"750"  }}>
            <span style={{ color: "#DB4437" }}>D</span>
            <span style={{ color: "#4285F4" }}>H</span>
            <span style={{ color: "#0F9D58" }}>R</span>
            <span style={{ color: "" }}>U</span>
            <span style={{ color: "#F4B400" }}>V</span> Diagnostics
          </a>
        </Link>
			
			<h1 className={styles.heading}>Book a Test </h1>
			<Button
				label="Sign up with Google Account"
				style={{ background: "#070D59", color: "white" }}
			/>
			<p className={styles.or_container}>or</p>
			<form onSubmit={handlePayment} className={styles.form_container}>
				
				<div className={styles.input_container}>
					<TextField
						label="Patient Name*"
						placeholder="Enter Patient name"
						name="patientName"
						handleInputState={handleInputState}
						schema={schema.patientName}
						handleErrorState={handleErrorState}
						value={patientData.patientName}
						error={errors.patientName}
						required={true}
					/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="Age*"
						placeholder="what's the patient Age"
						name="age"
						handleInputState={handleInputState}
						schema={schema.age}
						handleErrorState={handleErrorState}
						value={patientData.age}
						error={errors.age}
						type="age"
						required={true}
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
						label="email?*"
						placeholder="Enter your email "
						name="emailId"
						handleInputState={handleInputState}
						schema={schema.emailId}
						handleErrorState={handleErrorState}
						value={patientData.emailId}
						error={errors.emailId}
						required={true}
					/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="Mobile Number"
						placeholder="Enter your Mobile Number"
						name="mobileNumber"
						handleInputState={handleInputState}
						schema={schema.mobileNumber}
						handleErrorState={handleErrorState}
						value={patientData.mobileNumber}
						error={errors.mobileNumber}
						required={true}
					/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="Address"
						placeholder="Enter your address"
						name="address"
						handleInputState={handleInputState}
						schema={schema.address}
						handleErrorState={handleErrorState}
						value={patientData.address}
						error={errors.address}
						required={true}
					/>
				</div>
                <div className={styles.input_container}>
                                <Select
								name="tests"
                                handleInputState={(name, value) => handleInputState("tests", value)}
								label="Tests *"
								placeholder="tests"
								options={fetchedTests}
								value={patientData.tests.map((test) => test.t)}
								required={true}
							    />
                </div>
                <div className={styles.input_container}>
                                <Select
								name="packages "
								handleInputState={(name, value) => handleInputState("packages", value)}
								label="Packages"
								placeholder="Packages"
								options={fetchedPackages}
								value={patientData.packages.map((p)=>p.package)}
								required={true}
							    />
                </div>
				
				<div className={styles.checkbox_container}>
					<Checkbox
						required={true}
						label="Share my registration data with Dhruv Diagnostics."
					/>
				</div>
				<p className={styles.terms_condition}>
					By clicking on sign-up, you agree to Dhruv Diagnostics{" "}
					<Link to="/terms"><a href="/#">Terms and Conditions of Use.</a></Link>
				</p>
				<p className={styles.terms_condition}>
					To learn more about how Dhruv collects, uses, shares and protects
					your personal data, please see{" "}
					<Link to="/terms"><a href="/#">Dhruv's Privacy Policy.</a></Link>
				</p>
				<div >
					<Button label="Book Test" type="submit"  />
				</div>
		
			</form>
		</div>
	);
};

export default DirectPatient;
