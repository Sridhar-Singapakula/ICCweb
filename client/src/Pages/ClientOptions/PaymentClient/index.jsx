import React, { useEffect, useState } from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

function PaymentClient() {
  const { user } = useSelector((state) => state.user);
  const [amount, setAmount] = useState();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initPayment = (data) => {
    const options = {
      key: process.env.KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: user && user.name,
      description: 'Test Transaction',
      image: 'https://www.dhruvlabs.com/images/logo.png',
      order_id: data.id,
	  
      handler: async (response) => {
        try {
		  console.log(response)
          const verifyUrl = process.env.REACT_APP_API_URL+`/payments/verify`;
          const { data } = await axios.post(verifyUrl, {response,clientId: user && user._id,amount:amount});
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: '#3399cc',
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = process.env.REACT_APP_API_URL+'/payments/orders';
      const { data } = await axios.post(orderUrl, { amount, clientId: user && user._id });
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="book_container">
        <p className="book_payment">Make Payment</p>
        <p className="book_name">Dhruv Diagnostics</p>
        <p className="book_author">By {user && user.name}</p>
        <p className="book_price">
          Amount :
          <span>&#x20B9; {amount}</span>
        </p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="amount_input"
          placeholder="Enter Amount"

        />
        <button onClick={handlePayment} className="buy_btn">
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default PaymentClient;
