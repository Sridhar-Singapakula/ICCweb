import React, {useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css";
import { toast } from "react-toastify";
import { useSelector,useDispatch} from 'react-redux';

import axiosInstance from '../../../../../redux/axiosInstance';





const DeleteEvent = ({ id,name,participantsTable,date,onClose }) => {
    const { user } = useSelector((state) => state.user);

  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);
	const dispatch = useDispatch();

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (Object.keys(errors).length === 0) {
              setIsFetching(true);
              const url = process.env.REACT_APP_API_URL + `/GCFinalResults/${id}`;
              await axiosInstance.delete(url);
              setIsFetching(false);
              toast.success("Deleted Announcement successfully");
                onClose()
            } else {
                console.log("please fill out properly");
            }
        };

  return (
    <div className="popup_container">
      <div className="popup_content">
        <h2>Delete Results</h2>
        <h1 className='head_'>{name}</h1>
        <div className="card_">
        <div>
        </div>
      </div>
      {participantsTable}
      <form onSubmit={handleSubmit} className="form_container">
                <div className="form_bottom">
						<button
						type="submit"
						label="Delete Announcement"
                        className="button-17"
                        style={{marginLeft:"-5px"}}
                        >Delete</button>
					</div>
				</form>
                <button onClick={onClose} className="button-17" style={{marginTop:"-20px",marginLeft:"280px",fontSize:"13px"}}>Close</button>
      </div>
        <div className="select-container">
       
        </div>
      </div>
   
  );
};

DeleteEvent.propTypes = {
  eventId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteEvent;
