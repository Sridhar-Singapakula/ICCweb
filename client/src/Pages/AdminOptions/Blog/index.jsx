import React from 'react'
import TextField from '../../../components/Inputs/TextField'
import FileInput from '../../../components/Inputs/FileInput'
import Joi from "joi"
import {useState,useEffect} from "react"
import { Link,useHistory} from "react-router-dom";
import "./style.css"
import axiosInstance from "../../../redux/axiosInstance"
import { toast } from "react-toastify";


const Blog = () => {
    const [data, setData] = useState({
		name: "",
		subject: "",
    img:"",
		blog: "",
	});
	const [errors, setErrors] = useState({});
	const [isFetching, setIsFetching] = useState(false);
	
	const history = useHistory();

	const handleInputState = (name, value) => {
		setData((data) => ({ ...data, [name]: value }));
	};
    const schema = {
        name: Joi.string().required(),
        subject: Joi.string().required(),
        img:Joi.string().required(),
        blog: Joi.string().required()}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            setIsFetching(true);
            const url = process.env.REACT_APP_API_URL + "/blog";
            await axiosInstance.post(url, data);
            
            setIsFetching(false);
            toast.success("Blog created successfully");
        } catch (error) {
            setIsFetching(false);
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status < 500
            ) {
                toast.error(error.response.data);
            } else {
                console.log(error.response);
                toast.error("Something went wrong!");
            }
        }
		
	};

  return (
    <div className='cont'>
         <form onSubmit={handleSubmit} className="php-email-form">
              <div className="row">
                <div className="col form-group">
                      <TextField
						            label="Name"
                        name="name"
						            placeholder="Enter your Name"
                        handleInputState={handleInputState}
                        schema={schema.name}
						            value={data.name}
                        error={errors.name}
                        type="name"
                        style={{ maxWidth: '500px', fontSize: '12px', padding: '4px', height: '40px' }}
					            />
                </div>
               
                
              </div>
              <div className="col form-group">
                      <TextField
						            label="Subject"
						            placeholder="Subject"
                        name="subject"
						            handleInputState={handleInputState}
                        schema={schema.subject}
						            value={data.subject}
                        error={errors.subject}
                        type="subject"
						            style={{ width: '500px', fontSize: '12px', padding: '4px', height: '40px' }}
					            />
              </div>
              <div className="form-group">
              <TextField
						            label="blog?"
						            placeholder="blog"
                        name="blog"
						            handleInputState={handleInputState}
                        schema={schema.blog}
						            value={data.blog}
                        error={errors.blog}
                        type="blog"
                        className="dynamic-text-field"
						            style={{  width: '500px',
                                    fontSize: '12px',
                                    padding: '4px',
                                    resize: 'vertical',
                                    height: '300px'
                            }}
					            />
              </div>
           
           
              <div className="form-group" style={{marginTop:"15px"}}>
              <FileInput
            label="Choose Image"
            type="image"
            name="img"
            value={data.img}
            handleInputState={handleInputState}
          />
              </div>
              <div ><button type="submit" className='button-17'>Upload Blog</button></div>
            </form>
    </div>
  )
}

export default Blog