import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "./style.css";
import axiosInstance from "../../../redux/axiosInstance";

const CostOfSamples = () => {
  const [patients, setPatients] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [isFetching, setIsFetching] = useState(false);
  const columns = [ 'id','PatientName', 'PatientAge', 'Tests','Packages',"totalCost",'MobileNo','RecordEntryDate'];
  const pageLimit = 10;

  useEffect(() => {
    getPatients();
    // getTestName();
  }, []);

  const getPatients = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/client/patients/allPatients`;
      const { data } = await axiosInstance.get(url);
      setPatients(data.data);
   
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };
  

  const transformData = () => {
    return patients.sort((a, b) => new Date(b.dateOfCreation) - new Date(a.dateOfCreation))
    .map((patient,index) => {
      
        const tests = patient.tests.map((test) => {
          const testText = test.test;
          let testColor = '';
  
          if (test.status === 'pending') {
            testColor = '#E06469';
          } else if (test.status === 'success') {
            testColor = 'green';
          }
  
          return (
            <div>
              <span style={{ color: testColor }}>{`${testText} (${test.status}) ₹${test.mrp}`}</span>
            </div>
          );
        });
  
        const packages = patient.packages.map((p) => {
         
          const packageText = p.package;
          let packageColor = '';
  
          if (p.status === 'pending') {
            packageColor = '#E06469';
          } else if (p.status === 'success') {
            packageColor = 'green';
          }
  
          return (
            <div>
              <span style={{ color: packageColor }}>{`${packageText} (${p.status}) ₹${p.mrp}`}</span>
            </div>
          );
        });
  
        return {
          id: index + 1,
          PatientName: patient.patientName,
          PatientAge: patient.age,
          Tests: tests,
          Packages: packages,
          MobileNo: patient.mobileNumber,
          totalCost: `₹${patient.totalCost}`,
          RecordEntryDate: patient.dateOfCreation,
        };
      });
  };
  
  

  return (
    <div className="container">
      <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px" }}>
       Costs of all Samples
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
      <p className='totalCost'>TotalCost of All Samples:₹{user && user.totalCost}</p>
    </div>
  );
};

export default CostOfSamples;
