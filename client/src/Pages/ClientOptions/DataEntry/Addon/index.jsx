import React, { useEffect, useState } from 'react';
import Table from '../../../../components/Table';
import { useSelector} from 'react-redux';
import "./style.css";
import axiosInstance from "../../../../redux/axiosInstance";
import Popup from '../AddOnPopUp';

const AddOns = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { user } = useSelector((state) => state.user);
  const columns = ['id', 'PatientName', 'PatientAge', 'Tests', 'Packages', 'MobileNo', 'RecordEntryDate', 'Add_Ons'];
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



  const openPopup = (patientId, patientName) => {
    setSelectedPatientId({ id: patientId, name: patientName });
  };
  

  const closePopup = () => {
    setSelectedPatientId(null);
  };


  const transformData = () => {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  
    return patients
      .filter((patient) => {
        const creationDate = new Date(patient.dateOfCreation);
        return creationDate >= tenDaysAgo;
      })
      .map((patient) => {
        const tests = patient.tests.map((test) => {
          const testText = test.test;
          let testColor = '';
  
          if (test.status === 'pending') {
            testColor = 'orange';
          }else if (test.status === 'rejected') {
            testColor = 'red';
          }
           else if (test.status === 'success') {
            testColor = 'green';
          }
  
          return (
            <div>
              <span style={{ color: testColor }}>{`${testText} (${test.status})`}</span>
            </div>
          );
        });
  
        const packages = patient.packages.map((p) => {
          const packageText = p.package;
          let packageColor = '';
  
          if (p.status === 'pending') {
            packageColor = 'orange';
          } 
          else if (p.status === 'rejected') {
            packageColor = 'red';
          }else if (p.status === 'success') {
            packageColor = 'green';
          }
  
          return (
            <div>
              <span style={{ color: packageColor }}>{`${packageText} (${p.status})`}</span>
            </div>
          );
        });
  
        return {
          id: patient._id,
          PatientName: patient.patientName,
          PatientAge: patient.age,
          Tests: tests,
          Packages: packages,
          MobileNo: patient.mobileNumber,
          RecordEntryDate: patient.dateOfCreation,
          Add_Ons:  <button className="button-17" onClick={() => openPopup(patient._id, patient.patientName)}>Add-Ons +</button>,
        };
      });
  };
  
 
  
  
  
  

  return (
    <div className="container">
      <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px" }}>
        History of Patient Reports
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
      {selectedPatientId && <Popup patientId={selectedPatientId.id} patientName={selectedPatientId.name} onClose={closePopup} />}
    </div>
  );
};

export default AddOns;
