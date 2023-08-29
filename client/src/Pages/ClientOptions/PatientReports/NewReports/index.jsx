import React, { useEffect, useState } from 'react';
import Table from '../../../../components/Table';
import { useSelector } from 'react-redux';
import "./style.css";
import axiosInstance from "../../../../redux/axiosInstance";

const App = () => {
  const [patients, setPatients] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [isFetching, setIsFetching] = useState(false);
  const columns = [ 'PatientName', 'PatientAge', 'Tests','Packages','MobileNo','RecordEntryDate','DownloadReport'];
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
  
  const downloadReport = (reportLink) => {
    window.open(reportLink, '_blank'); // Open the report link in a new tab
  };

  const transformData = () => {
    const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  return patients
    .filter((patient) => {
      const allTestsSuccess = patient.tests.some((test) => test.status === 'success');
      const allPackagesSuccess = patient.packages.some((p) => p.status === 'success');
      const isWithinLastTenDays = new Date(patient.dateOfCreation) >= tenDaysAgo;
      return (allTestsSuccess || allPackagesSuccess) && isWithinLastTenDays;
    })
    .sort((a, b) => new Date(b.dateOfCreation) - new Date(a.dateOfCreation))
    .map((patient) => {
        const tests = patient.tests.map((test) => {

          const testText = test.test;
          let testColor = '';
  
          if (test.status === 'pending') {
            testColor = 'red';
          } else if (test.status === 'success') {
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
            packageColor = 'red';
          } else if (p.status === 'success') {
            packageColor = 'green';
          }
  
          return (
            <div>
              <span style={{ color: packageColor }}>{`${packageText} (${p.status})`}</span>
            </div>
          );
        });
        console.log(patient)
        return {
          id: patient._id,
          PatientName: patient.patientName,
          PatientAge: patient.age,
          Tests: tests,
          Packages: packages,
          MobileNo: patient.mobileNumber,
          RecordEntryDate: patient.dateOfCreation,
          DownloadReport: (
            <button onClick={() => downloadReport(patient.report)} class="button-17">Download</button>
          ),
        };
      });
  };
  
  

  return (
    <div className="container">
      <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px" }}>
        New Patient Reports
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
    </div>
  );
};

export default App;
