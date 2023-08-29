import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import { useSelector } from 'react-redux';
import "./style.css";
import axiosInstance from "../../../redux/axiosInstance";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [isFetching, setIsFetching] = useState(false);
  const columns = ['Name','emailId', 'mobileNumber', 'subject', 'message','date'];
  const pageLimit = 10;

  useEffect(() => {
    getQueries();
  }, []);

  const getQueries = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/queries`;
      const { data } = await axiosInstance.get(url);
      
      setQueries(data.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const transformData = () => {
    return queries.map((query) => {
  
        return {
          Name: query.name,
          emailId: query.emailId,
          mobileNumber: query.mobileNumber,
          subject: query.subject,
          message:query.message,
          date:query.dateOfCreation
   
      };
    });
  };

  return (
    <div className="container">
      <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px" }}>
       Transaction Details
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
    </div>
  );
};

export default Queries;
