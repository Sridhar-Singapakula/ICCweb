import React, { useEffect, useState } from 'react';
import Table from '../../../../components/Table';
import { useSelector } from 'react-redux';
import "./style.css";
import axiosInstance from "../../../../redux/axiosInstance";
import EditTest from "../EditTest"
import AddTest from "../AddTest"

const AdminPriceList = ()=>{
    const [tests,setTests] =useState([])
    const [packages,setPackages] =useState([])
    const { user } = useSelector((state) => state.user);
    const [isFetching, setIsFetching] = useState(false);
    const [selectedTestId,setSelectedTestId]=useState(null);

    const [selectedAdd,setSelectedAdd] =useState(null);
    const columns = ['testName','MRP',"SampleType","CollectionTube",'edit'];
    const columns1 = ['packageName','testsIncluded','MRP','B2B'];
    const pageLimit = 20;

    useEffect(() => {
        getTests();
        getPackages();
      }, []);

      const getTests = async () => {
        try {
          setIsFetching(true);
          const url = process.env.REACT_APP_API_URL + `/tests`;
          const { data } = await axiosInstance.get(url);
          setTests(data.data);
       
          setIsFetching(false);
        } catch (error) {
          console.log(error);
          setIsFetching(false);
        }
      };
      const getPackages= async () => {
        try {
          setIsFetching(true);
          const url = process.env.REACT_APP_API_URL + `/packages`;
          const { data } = await axiosInstance.get(url);
          setPackages(data.data);
       
          setIsFetching(false);
        } catch (error) {
          console.log(error);
          setIsFetching(false);
        }
      };


      
  const openTest = (testId) => {
    setSelectedTestId({ id:testId });
    
  };

  const closeTest = () => {
    setSelectedTestId(null);
  };
  
  const openAddTest = (packageId) => {
    setSelectedAdd({id:packageId });
    
  };

  const closeAddTest = () => {
    setSelectedAdd(null);
  };


      const transformData =  () => {
        return  tests.map((test) => {
    
          return {
            testName:test.testName,
            MRP: `₹${test.mrp}`,
            SampleType:test.sampleType,
            CollectionTube:test.collectionTube,
            edit:<button className="button-17" onClick={() => openTest(test._id)} >Edit</button>
          };
        });
      };
      const transformPackages =  () => {
        return  packages.map((p) => {
            const tests=p.testsIncluded.map((test)=>{
                const testName = test
                return (
                    <div>
                      <span>{testName}</span>
                    </div>
                  );
            })
    
          return {
            packageName:p.packageName,
            testsIncluded:tests,
            MRP: `₹${p.mrp}`,
            B2B: p.b2b,
          };
        });
      };

      return (
        <div class="Prices">
        <div className="transaction_container">
          <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px",marginLeft:"20px" }}>
            Tests Prices <button className="button-17" onClick={() => openAddTest()} >Add Tests +</button>
            {selectedAdd && <AddTest onClose={closeAddTest}/>}
          </h1>
          
          <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
          {selectedTestId && <EditTest testId={selectedTestId.id} onClose={closeTest}/>}
        </div>
        <div className="transaction_container">
          <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px",marginLeft:"20px" }}>
            Packages Prices  
          </h1>
          <Table data={transformPackages()} columns={columns1} pageLimit={pageLimit} />
          {/* {selectedPackageId && <EditPackage packageId={selectedPackageId.id} onClose={closeEditPackage}/>} */}
        </div>
        
        </div>
      );

};

export default AdminPriceList
