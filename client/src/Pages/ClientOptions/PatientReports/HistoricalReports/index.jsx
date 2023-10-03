import React, { useEffect, useState } from 'react';
import Table from '../../../../components/Table';
import { useSelector} from 'react-redux';
import "./style.css";
import axiosInstance from "../../../../redux/axiosInstance";

const App = () => {
  const [patients, setPatients] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [isFetching, setIsFetching] = useState(false);
  const columns = ['id', 'PatientName', 'PatientAge', 'Tests','Packages','MobileNo','RecordEntryDate','DownloadReport'];
  const pageLimit = 10;

  useEffect(() => {
    getPatients();
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

  console.log(patients)
  // const fetchTestNames = async (patients) => {
  //   try {
  //     const updatedPatients = await Promise.all(
  //       patients.map(async (patient) => {
  //         const tests = await Promise.all(
  //           patient.tests.map(async (test) => {
  //             if (test.testId) {
  //               const testName = await getTestName(test.testId);
  //               return testName;
  //             }
  //             return '';
  //           })
  //         );
  //         return { ...patient, tests };
  //       })
  //     );
  //     setPatients(updatedPatients);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  
  // const getTestName = async (id) => {
  //   try {
  //     const url = process.env.REACT_APP_API_URL + `/tests/${id}`;
  //     const response = await axiosInstance.get(url);
  //     return response.data.data.testName;
  //   } catch (error) {
  //     console.log(error);
  //     return '';
  //   }
  // };
  
  const downloadReport = (reportLink) => {
    window.open(reportLink, '_blank'); // Open the report link in a new tab
  };

  const transformData = () => {
    return patients
    .filter((patient) => {
      const allTestsSuccess = patient.tests.every((test) => test.status === 'success');
      const allPackagesSuccess = patient.packages.every((p) => p.status === 'success');
      return allTestsSuccess && allPackagesSuccess;
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
        History of Patient Reports
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
    </div>
  );
};

export default App;
