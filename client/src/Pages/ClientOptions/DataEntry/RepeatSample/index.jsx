import React, { useEffect, useState } from 'react';
import Table from '../../../../components/Table';
import { useSelector} from 'react-redux';
import "./style.css";
import axiosInstance from "../../../../redux/axiosInstance";

const RepeatSample = () => {
  const [patients, setPatients] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [isFetching, setIsFetching] = useState(false);
  const columns = ['id', 'PatientName', 'PatientAge', 'Tests','Packages','MobileNo','RecordEntryDate'];
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
  const transformData = () => {
    const today = new Date();
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    return patients
      .filter((patient) => {
        const anyTestRejected = patient.tests.some((test) => test.status === 'rejected');
        const anyPackageRejected = patient.packages.some((p) => p.status === 'rejected');
        const creationDate = new Date(patient.dateOfCreation);
        return (anyTestRejected || anyPackageRejected) && creationDate >= tenDaysAgo;
      })
      .sort((a, b) => new Date(b.dateOfCreation) - new Date(a.dateOfCreation))
      .map((patient) => {
        const tests = patient.tests.map((test) => {
          const repeatReason=test.repeatReason || '';
          const testText = test.test;
          let testColor = '';
  
          if (test.status === 'pending') {
            testColor = 'orange';
          } else if (test.status === 'success') {
            testColor = 'green';
          } else if (test.status === 'rejected') {
            testColor = 'red';
          }
  
          return (
            <div>
              <span style={{ color: testColor }}>{`${testText} (${test.status}) (${repeatReason})`}</span>
            </div>
          );
        });
  
        const packages = patient.packages.map((p) => {
          const packageText = p.package;
          // const repeatReason=p.repeatReason || '';
          let packageColor = '';
  
          if (p.status === 'pending') {
            packageColor = 'orange';
          } else if (p.status === 'success') {
            packageColor = 'green';
          } else if (p.status === 'rejected') {
            packageColor = 'red';
          }
  
          return (
            <div>
              <span style={{ color: packageColor }}>{`${packageText} (${p.status}) `}</span>
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

export default RepeatSample;
