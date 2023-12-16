import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import Select from "../../../../components/Inputs/Select";
import TextField from '../../../../components/Inputs/TextField';
import axiosInstance from '../../../../redux/axiosInstance';
import FileInput from '../../../../components/Inputs/FileInput';

const AddParticipantToCompetition = ({ competitionId, onClose }) => {
    const { user } = useSelector((state) => state.user);


    const [errors, setErrors] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useDispatch();

    const [data, setData] = useState({
        name: "",
        rollNo: "",
        hostelNo: "",
    });

    const handleInputState = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleErrorState = (name, value) => {
        value === ""
            ? delete errors[name]
            : setErrors({ ...errors, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0) {
            setIsFetching(true);
            const url = process.env.REACT_APP_API_URL + `/GCparticipants/${competitionId}/add-participant`;
            await axiosInstance.post(url, { participant: data });
            console.log(data)
            setIsFetching(false);
            toast.success("Participant added to the competition successfully");
            onClose();
        } else {
            console.log("Please fill out the participant details properly.");
        }
    };

    return (
        <div className="popup_container">
             <h2>Add Participant to Competition</h2>
            <div className="popup_content">
               
                <div className="select-container">
                    <form onSubmit={handleSubmit} className="form_container">
                        <TextField
                            label="Name"
                            name="name"
                            placeholder="Enter participant's name"
                            handleInputState={handleInputState}
                            value={data.name}
                            error={errors.name}
                            type="name"
                            style={{
                                width: '200px',
                                fontSize: '12px',
                                padding: '4px',
                                height: '40px',
                                background: "transparent",
                                border: "1px solid white",
                                color: "orange"
                            }}
                        />
                        <TextField
                            label="Roll No"
                            name="rollNo"
                            placeholder="Enter participant's roll number"
                            handleInputState={handleInputState}
                            value={data.rollNo}
                            error={errors.rollNo}
                            type="rollNo"
                            style={{
                                width: '200px',
                                fontSize: '12px',
                                padding: '4px',
                                height: '40px',
                                background: "transparent",
                                border: "1px solid white",
                                color: "orange"
                            }}
                        />
                        <TextField
                            label="Hostel No"
                            name="hostelNo"
                            placeholder="Enter participant's hostel number"
                            handleInputState={handleInputState}
                            value={data.hostelNo}
                            error={errors.hostelNo}
                            type="hostelNo"
                            style={{
                                width: '200px',
                                fontSize: '12px',
                                padding: '4px',
                                height: '40px',
                                background: "transparent",
                                border: "1px solid white",
                                color: "orange"
                            }}
                        />
                        <div className="form_bottom">
                            <button
                                type="submit"
                                label="Add Participant"
                                className="button-17"
                                style={{ marginLeft: "-5px" }}
                            >
                                Add Participant
                            </button>
                        </div>
                    </form>
                    <button onClick={() => onClose()} className="button-17" style={{ marginTop: "-20px", marginLeft: "280px", fontSize: "13px" }}>Close</button>
                </div>
            </div>
        </div>
    );
};

AddParticipantToCompetition.propTypes = {
    competitionId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddParticipantToCompetition;
