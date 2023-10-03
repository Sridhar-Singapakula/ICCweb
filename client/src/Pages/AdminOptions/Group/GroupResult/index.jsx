import React, { useState } from 'react';
import TextField from '../../../../components/Inputs/TextField';
import Joi from 'joi';
import axiosInstance from '../../../../redux/axiosInstance';
import { toast } from 'react-toastify';

const GCGroupResult = () => {
  const [data, setData] = useState({
    name: '',
    Link: '',
  });

  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const handleInputState = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  const schema = {
    name: Joi.string().required(),
    sheetLink: Joi.string().required(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + '/GroupResult'; // Adjust the API URL accordingly
      await axiosInstance.post(url, data);

      setIsFetching(false);
      toast.success('GC Group Result added successfully');
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
    <div className="cont">
      <form onSubmit={handleSubmit} className="php-email-form">
        <div className="form-group">
          <TextField
            label="GC Name"
            name="name"
            placeholder="Enter GC Name"
            handleInputState={handleInputState}
            schema={schema.name}
            value={data.name}
            error={errors.name}
            type="text"
            style={{
              maxWidth: '500px',
              fontSize: '12px',
              padding: '4px',
              height: '40px',
            }}
          />
        </div>

        <div className="form-group">
          <TextField
            label="Sheet Link"
            name="Link"
            placeholder="Enter Sheet Link"
            handleInputState={handleInputState}
            schema={schema.Link}
            value={data.Link}
            error={errors.Link}
            type="text"
            className="dynamic-text-field"
            style={{
              width: '500px',
              fontSize: '12px',
              padding: '4px',
              height: '40px',
            }}
          />
        </div>

        <div>
          <button type="submit" className="button-17">
            Upload GC Group Result
          </button>
        </div>
      </form>
    </div>
  );
};

export default GCGroupResult;
