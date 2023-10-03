import React from 'react'
import TextField from '../../../components/Inputs/TextField'
import FileInput from '../../../components/Inputs/FileInput'
import Joi from "joi"
import {useState,useEffect} from "react"
import { Link,useHistory} from "react-router-dom";
import "./style.css"
import axiosInstance from "../../../redux/axiosInstance"
import { toast } from "react-toastify";

const Event = () => {
  const [data, setData] = useState({
    GC: '',
    Venue: '',
    Date: '',
    img: '',
    Secy: '',
  });

  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const handleInputState = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  const schema = {
    GC: Joi.string().required(),
    Venue: Joi.string().required(),
    Date: Joi.string().required(),
    img: Joi.string().required(),
    Secy: Joi.string().required(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + '/event'; // Adjust the API URL accordingly
      await axiosInstance.post(url, data);

      setIsFetching(false);
      toast.success('Announcement added successfully');
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
        toast.error('Something went wrong!');
      }
    }
  };

  return (
   
          <div className="col-lg-6">
      <form onSubmit={handleSubmit}>
          <div className="col form-group" >
            <TextField
              label="GC"
              name="GC"
              placeholder="Enter GC"
              handleInputState={handleInputState}
              schema={schema.GC}
              value={data.GC}
              error={errors.GC}
              type="text"

              style={{
                fontSize: '12px',
                padding: '4px',
                height: '40px',
              }}
            />
          </div>
          <div className="col form-group">
            <TextField
              label="Venue"
              name="Venue"
              placeholder="Enter Venue"
              handleInputState={handleInputState}
              schema={schema.Venue}
              value={data.Venue}
              error={errors.Venue}
              type="text"
              style={{
                fontSize: '12px',
                padding: '4px',
                height: '40px',
              }}
            />
          </div>
        <div className="form-group">
          <TextField
            label="Date"
            name="Date"
            placeholder="Enter Date"
            handleInputState={handleInputState}
            schema={schema.Date}
            value={data.Date}
            error={errors.Date}
            type="text"
            className="dynamic-text-field"
            style={{
              fontSize: '12px',
              padding: '4px',
              height: '40px',
            }}
          />
        </div>

        <div className="form-group">
          <TextField
            label="Secy"
            name="Secy"
            placeholder="Enter Secy"
            handleInputState={handleInputState}
            schema={schema.Secy}
            value={data.Secy}
            error={errors.Secy}
            type="text"
            className="dynamic-text-field"
            style={{
              fontSize: '12px',
              padding: '4px',
              height: '40px',
            }}
          />
        </div>

        <div className="form-group" style={{ marginTop: '15px' }}>
        <FileInput
            label="Choose Image"
            type="image"
            name="img"
            value={data.img}
            handleInputState={handleInputState}
          />
        </div>

        <div>
          <button type="submit" className="button-17">
            Upload GC
          </button>
        </div>
      </form>
     
    </div>
  );
};

export default Event;
