import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import { useSelector} from 'react-redux';
import "./style.css";
import axiosInstance from "../../../redux/axiosInstance";

const TransactionDetails = () => {
  const [amounts, setAmounts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { user } = useSelector((state) => state.user);

  const columns = ['id', 'AmountDeposited', 'TransactionId', 'status', 'PaymentTime'];
  const pageLimit = 10;

  useEffect(() => {
    
      getAmounts();
  }, [user]);

  const getAmounts = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/clients/${user._id}/amountDeposited`;
      const { data } = await axiosInstance.get(url);
      
      setAmounts(data);
     
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };
  console.log(amounts)
  
  

  const transformData =  () => {
    return  amounts.map((amount) => {

    let statusColor;
    if (amount.status === 'success') {
      statusColor = 'green';
    } else {
      statusColor = '#E06469';
    }
      return {
        id: amount._id,
        AmountDeposited: `₹${amount.amountDeposited}`,
        TransactionId: amount.transactionId,
        status: <span style={{ color: statusColor }}>{amount.status}</span>,
        PaymentTime: amount.dateOfCreation,
      };
    });
  };




  

  return (
    <div className="transaction_container">
      <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px",marginLeft:"20px" }}>
        Transaction Details
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
    </div>
  );
};

export default TransactionDetails;
