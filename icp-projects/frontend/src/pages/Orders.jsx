import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getorders, addorder } from '../features/orders/orderSlice';
import { reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';


function Orders() {
  const { user } = useSelector((state) => state.auth);
  const { orders, isLoading, isError, isSuccess, message} = useSelector((state) => state.orders);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (!user) {
    //   navigate('/');
    //   return;
    // }
    dispatch(getorders());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const [productName, setProductName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [amount, setAmount] = useState('');

  const addOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      order_date: new Date().toLocaleDateString(),
      order_description: productName,
      due_delivery_time: dueDate + ' ' + dueTime,
      order_status: 'Pending',
      amount: parseFloat(amount),
    };
    dispatch(addorder(newOrder));
    alert('Order successful ...');
    setProductName('');
    setDueDate('');
    setDueTime('');
    setAmount('');
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="health">
      <section className='form'>
        <form action="">
          <div className='form-group'>
            <input
              type='text'
              placeholder='Product Name'
              className='form-control'
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <label htmlFor="">Due Delivery Date and Time</label>

            <input
              type='date'
              className='form-control'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <input
              type='time'
              className='form-control'
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
            <input
              type='number'
              placeholder='Amount'
              className='form-control'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button onClick={addOrder}>Make Order</button>
        </form>
      </section>
     <h2>Made Orders</h2>
            <table>
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Order Description</th>
                <th>Due Delivery Time</th>
                <th>Order Status</th>
                <th>Amount</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {orders.length > 0 ? (
             <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.order_date}</td>
                <td>{order.order_description}</td>
                <td>{order.due_delivery_time}</td>
                <td>{order.order_status}</td>
                <td>Ksh {order.amount}</td>
                <td><button>Confirm Received</button></td>
                <td><button style={{background: 'red'}}>Not Received</button></td>
              </tr>
            ))}
            </tbody>
          ) : (
              <p>No Orders yet</p>
          )}
          
          </table>
      </div>
    </>
  );
}

export default Orders;
