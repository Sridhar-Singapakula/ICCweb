import React, { useEffect, useState } from 'react';
import Table from '../../../../components/Table';
import { useSelector } from 'react-redux';
import "./style.css";
import axiosInstance from "../../../../redux/axiosInstance";
import Popup from "../UpdateStatus"
import UpdatePackage from "../UpdatePackage"

const App = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { user } = useSelector((state) => state.user);
  const columns = ['id','client', 'PatientName', 'PatientAge', 'Tests','Packages','MobileNo','RecordEntryDate'];
  const pageLimit = 10;

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/client/patients/`;
      const { data } = await axiosInstance.get(url);
      setPatients(data.data);
   
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };
  const openUpdateStatus = (patientId,testId) => {
    setSelectedPatientId({ id: patientId,testId:testId });
    
  };

  const closeUpdateStatus = () => {
    setSelectedPatientId(null);
  };

  const openUpdatePackage = (patientId,packageId) => {
    setSelectedId({ id: patientId,packageId:packageId });
    
  };

  const closeUpdatePackage = () => {
    setSelectedId(null);
  };

  console.log(patients)
  

  const transformData = () => {
    return patients
    .sort((a, b) => new Date(b.dateOfCreation) - new Date(a.dateOfCreation))
    .map((patient) => {
        const tests = patient.tests.map((test) => {
          const status = test.status.status || '';
          const testText = test.testName;
          const testId=test.testId
          let testColor = '';
          if (test.status.status === 'pending') {
            testColor = 'orange';
          } else if (test.status.status === 'success') {
            testColor = 'green';
          } else if (test.status.status === 'rejected') {
            testColor = 'red';
          } 
  
          return (
            <div>
              <div style={{display:"flex"}}>
              <span style={{ color: testColor }}>{`${testText} (${status})`}</span>
              <button className="button-17" onClick={() => openUpdateStatus(patient._id,testId)} >UpdateStatus</button>
              </div>
              
            </div>
          );
        });
  
        const packages = patient.packages
        ? patient.packages.map((p) => {
            const status = p.status.status || '';
            const packageText = p.packageName;
            const packageId=p.packageId
            let packageColor = '';

            if (p.status.status === 'pending') {
              packageColor = 'orange';
            }  else if (p.status.status === 'success') {
                packageColor = 'green';
              } else if (p.status.status === 'rejected') {
                packageColor = 'red';
              }
            return (
              <div >
                <div style={{display:"flex"}}>
                <span style={{ color: packageColor }}>{`${packageText} (${status})`}</span>
                <button className="button-17" onClick={() => openUpdatePackage(patient._id,packageId)} >UpdateStatus</button>
                </div>
                
                
              </div>
            );
          })
        : [];
  
        return {
          id: patient._id,
          client:patient.clientName,
          PatientName: patient.patientName,
          PatientAge: patient.age,
          Tests: tests,
          Packages: packages,
          MobileNo: patient.mobileNumber,
          RecordEntryDate: patient.dateOfCreation
        };
      });
  };
  
  

  return (
    <div className="container">
      <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px" }}>
        History of Patient Reports
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
      {selectedPatientId && <Popup patientId={selectedPatientId.id} testId={selectedPatientId.testId} onClose={closeUpdateStatus} />}
      {selectedId && <UpdatePackage patientId={selectedId.id} packageId={selectedId.packageId} onClose={closeUpdatePackage} />}
    </div>
  );
};

export default App;
