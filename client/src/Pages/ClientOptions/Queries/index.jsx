import {React,useState} from 'react'
import  "./style.css"
import { useSelector,useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import Joi from "joi";
import TextField from "../../../components/Inputs/TextField";
import { Query } from '../../../redux/userSlice/apiCalls';


const Queries = () => {
	const [data, setData] = useState({
		name: "",
		mobileNumber: "",
		emailId: "",
		subject: "",
		message: "",
	});
	const [errors, setErrors] = useState({});
	const { user } = useSelector((state) => state.user);
	const [isFetching, setIsFetching] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleInputState = (name, value) => {
		setData((data) => ({ ...data, [name]: value }));
	};


    console.log(data)
    const schema = {
        name: Joi.string().allow(""),
        mobileNumber: Joi.string().allow(""),
        emailId: Joi.string().allow(""),
        subject: Joi.string().allow(""),
        message: Joi.string().allow("")}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = { data};
		const res = await Query(payload, dispatch);
		res && history.push("/clientHome");
	};

    return (
        <div className='Pro'>

<h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px",marginLeft:"20px" }}>
            Any Queries
          </h1>
        <div className="Profile_Cont">
                    <div className='top'>
                    <TextField
						label="name?"
                        name="name"
						placeholder="Enter your Name"
                        handleInputState={handleInputState}
                        schema={schema.name}
						value={data.name}
                        error={errors.name}
                        type="name"
						
						style={{ width: '150px', fontSize: '12px', padding: '4px', height: '40px', }}
					/>
                    <TextField
						label="Mobile Number?"
						placeholder="Enter your Mobile Number"
                        name="mobileNumber"
						handleInputState={handleInputState}
                        schema={schema.mobileNumber}
						value={data.mobileNumber}
                        error={errors.mobileNumber}
                        type="mobileNumber"
						style={{ width: '150px', fontSize: '12px', padding: '4px', height: '40px' }}
					/>
                    <TextField
						label="Email Id?"
						placeholder="Enter your emailId"
                        name="emailId"
						handleInputState={handleInputState}
                        schema={schema.emailId}
						value={data.emailId}
                        error={errors.emailId}
                        type="emailId"
						style={{ width: '150px', fontSize: '12px', padding: '4px', height: '40px' }}
					/>
                    </div>
                    <TextField
						label="subject?"
						placeholder="Enter your Lab subject"
                        name="subject"
						handleInputState={handleInputState}
                        schema={schema.subject}
						value={data.subject}
                        error={errors.subject}
                        type="subject"
						style={{ width: '500px', fontSize: '12px', padding: '4px', height: '40px' }}
					/>
                    <TextField
						label="Message?"
						placeholder="Message"
                        name="message"
						handleInputState={handleInputState}
                        schema={schema.message}
						value={data.message}
                        error={errors.message}
                        type="message"
						style={{
                            width: '500px',
                            height: '200px',
                            fontSize: '12px',
                            padding: '4px',
                            textAlign: 'start',
                             wordWrap: 'break-word',
                          }}
					/>

        </div>
        <button className='button-17' onClick={handleSubmit}>Update the details</button>
        </div>

    );
};

export default Queries;