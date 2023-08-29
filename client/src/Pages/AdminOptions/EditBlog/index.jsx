import React, {useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css";
import { toast } from "react-toastify";
import { useSelector,useDispatch} from 'react-redux';
import Select from "../../../components/Inputs/Select";
import TextField from '../../../components/Inputs/TextField';
import axiosInstance from '../../../redux/axiosInstance';
import FileInput from '../../../components/Inputs/FileInput'




const EditClient = ({ blogId,img,subject,blog,onClose }) => {
    const { user } = useSelector((state) => state.user);

  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);
	const dispatch = useDispatch();
  

  const [data, setData] = useState({ 
    subject:subject ?? "",
    blog:blog ?? "",
    img:img ?? ""
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
     
      console.log(data)

        const handleSubmit = async (e) => {
		
            e.preventDefault();
        
            if (Object.keys(errors).length === 0) {
                
              setIsFetching(true);
              const url = process.env.REACT_APP_API_URL + `/blog/${blogId}`;
              await axiosInstance.put(url, data);
              
              setIsFetching(false);
              toast.success("Updated Blog successfully");
                onClose()
            } else {
                console.log("please fill out properly");
            }
        };

  return (
    <div className="popup_container">
      <div className="popup_content">
        <h2>Update Blog</h2>
        <div className="select-container">
        <form onSubmit={handleSubmit} className="form_container">
                
                      <TextField
						            label="update Subject?"
                        name="subject"
						            placeholder="currentBalance"
                        handleInputState={handleInputState}
						            value={data.subject}
                        error={errors.subject}
                        type="subject"
						            style={{ width: '200px', fontSize: '12px', padding: '4px', height: '40px', background:"transparent",border:"1px solid white",color:"orange"}}
					            />
                      <TextField
						            label="Blog"
                        name="blog"
						            placeholder="Enter your blog"
                        handleInputState={handleInputState}
						            value={data.blog}
                        error={errors.blog}
                        type="blog"
						            style={{ width: '200px', fontSize: '12px', padding: '4px', height: '40px', background:"transparent",border:"1px solid white",color:"orange"}}
					            />
                        <FileInput
            label="Choose Image"
            type="image"
            name="img"
            value={data.img}
            handleInputState={handleInputState}
          />

                      



                <div className="form_bottom">
						<button
							type="submit"
							label="Addon Test"
              className="button-17"
              style={{marginLeft:"-5px"}}
						
							>Update Client</button>
						
					</div>
				</form>
                <button onClick={onClose} className="button-17" style={{marginTop:"-20px",marginLeft:"280px",fontSize:"13px"}}>Close</button>
        </div>
      </div>
    </div>
  );
};

EditClient.propTypes = {
  blogId: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  blog: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditClient;
