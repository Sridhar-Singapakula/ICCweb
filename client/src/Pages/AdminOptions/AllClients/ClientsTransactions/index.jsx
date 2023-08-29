import React, { useEffect, useState } from 'react';
import Table from '../../../../components/Table';
import { useSelector } from 'react-redux';
import "./style.css";
import axiosInstance from "../../../../redux/axiosInstance";

const ClientTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [isFetching, setIsFetching] = useState(false);
  const columns = ['id','ClientName', 'Amount', 'TransactionId', 'paymentTime'];
  const pageLimit = 10;

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/clientsTransactions`;
      const { data } = await axiosInstance.get(url);
      
      setTransactions(data.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  console.log(
    transactions
  )
  const transformData = () => {
    return transactions.map((transaction) => {
  
        return {
          id:transaction._id,
          ClientName: transaction.clientName,
          Amount: `₹${transaction.amountDeposited}`,
          TransactionId: transaction.transactionId,
          paymentTime: transaction.paymentTime,
   
      };
    });
  };

  return (
    <div className="container">
      <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px" }}>
       Transaction Details
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
    </div>
  );
};

export default ClientTransactions;
