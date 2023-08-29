import React from 'react'
import { useEffect,useState,Fragment} from 'react';
import { Link,useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";
import AOS from 'aos';
import logo from "../../img/images/logo.jpg"
import "./style.css"
import BlogPop from "../BlogPop"
import Navbar from '../../components/Navbar';

const Blogs = () => {

    const [blogs,setBlogs]=useState([]);
    const [selected, setSelected] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); 

    const handleMobileNavToggle = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };
    const sliderSettings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000, // Set the interval between slides (in milliseconds)
      };
    useEffect(() => {
        AOS.init();
        getBlogs();
      }, []);
      const openPop = (img,subject,blog) => {
        setSelected({ img: img,subject:subject,blog:blog });
        
      };
    
      const closePop = () => {
        setSelected(null);
      };
    


      const getBlogs = async () => {
		try {
			setIsFetching(true);
			const url = process.env.REACT_APP_API_URL + `/blog`;
			const { data } = await axios.get(url);
			console.log(data)
			setBlogs(data.data);
			console.log(blogs)
			setIsFetching(false);
		} catch (error) {
			console.log(error);
			setIsFetching(false);
		}
	};
  return (
    <div className='main'>
      <Navbar/>
    <section style={{marginTop:"50px"}}>
        <h2 style={{textAlign:"center",fontWeight:"650",fontSize:"38px",marginBottom:"25px"}}>Blogs</h2>
    {blogs.map((blog) => (
							<Fragment key={blog._id} className="main_cont">
								<div className="parent-container">
                                <div className="image-container">
                                   <img className='blogImage' src={blog.img} ></img>
                                </div>
                                <div className="text-container">
                                    <p className='date_info'>{blog.dateOfCreation}</p>
                                    <h3 className='subject_info'>{blog.subject}</h3>
                                    <p className='blog'>{blog.blog}</p>
                                    <button className="button-17" onClick={() => openPop(blog.img,blog.subject,blog.blog)}>Read More</button>
                                </div>
                                </div>
                                
							</Fragment>
						))}
                         {selected && <BlogPop img={selected.img} subject={selected.subject} blog={selected.blog} onClose={closePop} />}
    </section>
    


  <a href="/" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </div>
  )
}

export default Blogs