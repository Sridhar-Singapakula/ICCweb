import React, {useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css";
import { toast } from "react-toastify";
import { useSelector,useDispatch} from 'react-redux';

import axiosInstance from '../../../../redux/axiosInstance';





const DeleteEvent = ({ eventId,GC,venue,date,img,secy,onClose }) => {
    const { user } = useSelector((state) => state.user);

  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);
	const dispatch = useDispatch();

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (Object.keys(errors).length === 0) {
              setIsFetching(true);
              const url = process.env.REACT_APP_API_URL + `/event/${eventId}`;
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
        <h2>Delete Announcement</h2>
        <div className="card_">
        <div>
        <div className="header">
          <span className="icon">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                fillRule="evenodd"
              ></path>
            </svg>
          </span>
          <div>
        <p className="alert">{GC}</p>
          </div>
        
        </div>
        
        <div>
        
          <p className="message">Date: {date}</p>
          <p className="message">Venue: {venue}</p>
          <p className='message'>Contact your Hostel cult Cos to participate </p>
          <p className="message"> {secy}</p>
        </div>
        </div>
        <div className='gc_post'>
        <img src={img} className='post'></img>
      </div>
        
      </div>
        <div className="select-container">
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
      </div>
    </div>
  );
};

DeleteEvent.propTypes = {
  eventId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteEvent;
