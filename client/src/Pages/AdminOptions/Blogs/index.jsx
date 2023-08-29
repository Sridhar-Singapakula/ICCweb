import React from 'react'
import TextField from '../../../components/Inputs/TextField'
import FileInput from '../../../components/Inputs/FileInput'
import Joi from "joi"
import {useState,useEffect} from "react"
import { Link,useHistory} from "react-router-dom";
import "./style.css"
import axiosInstance from "../../../redux/axiosInstance"
import { toast } from "react-toastify";
import Table from '../../../components/Table';
import EditBlog from "../EditBlog"

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const columns = ['Img','Subject', 'blog', 'dateOfCreation',"EditBlog"];
    const [selected, setSelected] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
  const pageLimit = 8;

    useEffect(() => {
        getBlogs();
      }, []);
      const openPop = (img,subject,blog,blogId) => {
        setSelected({id:blogId,img: img,subject:subject,blog:blog });
        
      };
    
      const closePop = () => {
        setSelected(null);
      };
    


      const getBlogs = async () => {
		try {
			setIsFetching(true);
			const url = process.env.REACT_APP_API_URL + `/blog`;
			const { data } = await axiosInstance.get(url);
			console.log(data)
			setBlogs(data.data);
			console.log(blogs)
			setIsFetching(false);
		} catch (error) {
			console.log(error);
			setIsFetching(false);
		}
	};

    const transformData = () => {
        return blogs.map((blog) => {
      
            return {
              Img: <img src={blog.img} style={{width:"100px",height:"auto"}}></img>,
              Subject: blog.subject,
              blog:blog.blog,
              dateOfCreation:blog.dateOfCreation,
              EditBlog:<button className="button-17" onClick={() => openPop(blog.img,blog.subject,blog.blog,blog._id)}>Edit Blog</button>
       
          };
        });
      };
        
  return (
    <div>
        <div className="container">
      <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px" }}>
       ALL Blog Details
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
      {selected && <EditBlog img={selected.img} subject={selected.subject} blog={selected.blog} blogId={selected.id} onClose={closePop} />}
    </div>
    </div>
  )
}

export default Blogs