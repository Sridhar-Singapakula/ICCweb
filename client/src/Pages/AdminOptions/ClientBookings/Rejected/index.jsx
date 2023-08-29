import React, { useEffect, useState } from 'react';
import Table from '../../../../components/Table';
import { useSelector } from 'react-redux';
import "./style.css";
import axiosInstance from "../../../../redux/axiosInstance";
import Upload from "../Upload"

const App = () => {
  const [patients, setPatients] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const { user } = useSelector((state) => state.user);
  const columns = ['id','client', 'PatientName', 'PatientAge', 'Tests','Packages','MobileNo','RecordEntryDate','Upload'];
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

  console.log(patients)

  const openUpload = (patientId,testId) => {
    setSelectedPatientId({ id: patientId,testId:testId });
    
  };

  const closeUpload = () => {
    setSelectedPatientId(null);
  };
  

  const transformData = () => {
    return patients
    .filter((patient) => {
        const anyTestRejected = patient.tests.every((test) => test.status.status !== 'pending');
        const anyPackageRejected = patient.packages.every((p) => p.status.status !== 'pending');
        
        return anyTestRejected && anyPackageRejected;
      })
    .sort((a, b) => new Date(b.dateOfCreation) - new Date(a.dateOfCreation))
    .map((patient) => {
        const tests = patient.tests.map((test) => {
          const status = test.status.status || '';
          const testText = test.testName;
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
              <span style={{ color: testColor }}>{`${testText} (${status})`}</span>
            </div>
          );
        });
  
        const packages = patient.packages
        ? patient.packages.map((p) => {
            const status = p.status.status || '';
            const packageText = p.packageName;
            let packageColor = '';

            if (p.status.status === 'pending') {
              packageColor = 'red';
            }  else if (p.status.status === 'success') {
                packageColor = 'green';
              } else if (p.status.status === 'rejected') {
                packageColor = 'red';
              }
      
            return (
              <div>
                <span style={{ color: packageColor }}>{`${packageText} (${status})`}</span>
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
          RecordEntryDate: patient.dateOfCreation,
          Upload:<button className="button-17" onClick={() => openUpload(patient._id)} >Upload report</button>
        };
      });
  };
  
  

  return (
    <div className="container">
      <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px" }}>
        Some Rejected Samples
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
      {selectedPatientId && <Upload patientId={selectedPatientId.id} onClose={closeUpload} />}
    </div>
  );
};

export default App;
