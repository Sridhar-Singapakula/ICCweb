import React from 'react'
import PropTypes from 'prop-types';
import "./style.css";

const BlogPop = ({img,subject,blog,onClose}) => {
  return (
    <div className="popup_container">
      <div className="popup_content">
        <h2>Blog :{subject}</h2>
        <button onClick={onClose} className="button-17" style={{marginTop:"20px",marginBottom:"20px",fontSize:"13px"}}>Close</button>

        <div className="select-container">
         <img src={img} className='imageIn'></img>
         <h4  className='blog_m'>{blog}</h4>     
        </div>
      
      </div>
    </div>
  );
  
}
BlogPop.propTypes = {
    img: PropTypes.string.isRequired,
    subject:PropTypes.string.isRequired,
    blog: PropTypes.func.isRequired,
  };

export default BlogPop