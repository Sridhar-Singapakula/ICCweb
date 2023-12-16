import React, { useState } from 'react';

import AddPoints from './AddPoints';
import TextField from '../../../../components/Inputs/TextField';
import Joi from "joi";
import {useEffect} from "react"
import { Link,useHistory} from "react-router-dom";
import "./style.css"
import axiosInstance from "../../../../redux/axiosInstance"
import { toast } from "react-toastify";
import Table from '../../../../components/Table';
import PointsTable from "./PointsTable";

const CreateCompetition = () => {
    const [data, setData] = useState({
		name: "",
	});
    const columns = ["Position","hostelNo"];
    const [selected, setSelected] = useState(null);
    const [competition, setCompetition] = useState([]);
    const [competitionId, setCompetitionId] = useState(null);
	const [errors, setErrors] = useState({});
	const [isFetching, setIsFetching] = useState(false);
    
	
	const history = useHistory();

    useEffect(() => {
      }, [competitionId]);
      
    const openPop = (competitionId) => {
        setSelected({id:competitionId });
      };
    
      const closePop = () => {
        setSelected(null);
      };

	const handleInputState = (name, value) => {
		setData((data) => ({ ...data, [name]: value }));
	};
    const schema = {
        name: Joi.string().required()}

    
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            setIsFetching(true);
            const url = process.env.REACT_APP_API_URL + "/GroupGCRank";
            const response= await axiosInstance.post(url, data);
            const createdCompetitionId = response.data.data._id;
            setCompetitionId(createdCompetitionId);
            setIsFetching(false);
            toast.success("GC created successfully");
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
    <div className='partici_'>
        <h1 style={{color:"white",fontWeight:"600"}}>Upload GC Performance Rankings</h1>
                      <TextField
						            label="Name"
                        name="name"
						            placeholder="Enter GC Name"
                        handleInputState={handleInputState}
                        schema={schema.name}
						            value={data.name}
                        error={errors.name}
                        type="name"
                        style={{ maxWidth: '500px', fontSize: '12px', padding: '4px', height: '40px' }}
					            />
      <button onClick={handleSubmit} className='button-17'>Create GC Result +</button>
      {competitionId && (
        <PointsTable competitionId = {competitionId}/>
      )}
       { competitionId && (
        <div>
          <button onClick={openPop} className='button-17'>Add  +</button>
          {selected && <AddPoints
            competitionId={competitionId}
            onClose={closePop}
          /> }
        </div>
      )}
    </div>
  );
};

export default CreateCompetition;
