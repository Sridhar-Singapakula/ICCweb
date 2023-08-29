import React, { useEffect, useState } from 'react';
import Table from '../../../../components/Table';
import { useSelector } from 'react-redux';
import "./style.css";
import axiosInstance from "../../../../redux/axiosInstance";

const App = () => {
  const [patients, setPatients] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [isFetching, setIsFetching] = useState(false);
  const columns = ['id', 'PatientName', 'PatientAge', 'Tests','Packages','totalCost','MobileNo','RecordEntryDate'];
  const pageLimit = 10;

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/directPatient`;
      const { data } = await axiosInstance.get(url);
      setPatients(data.data);
   
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  console.log(patients)
  

  const transformData = () => {
    return patients
    .filter((patient) => {
        const anyTestRejected = patient.tests.some((test) => test.status.status === 'rejected');
        const anyPackageRejected = patient.packages.some((p) => p.status.status === 'rejected');
        
        return anyTestRejected || anyPackageRejected;
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
          PatientName: patient.patientName,
          PatientAge: patient.age,
          Tests: tests,
          Packages: packages,
          totalCost:patient.totalCost,
          MobileNo: patient.mobileNumber,
          RecordEntryDate: patient.dateOfCreation,
        };
      });
  };
  
  

  return (
    <div className="container">
      <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px" }}>
        History of Patient Reports
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
    </div>
  );
};

export default App;
