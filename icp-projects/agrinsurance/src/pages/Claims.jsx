import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getclaims, addclaim } from '../features/claims/claimSlice';
import { reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom'

function Claims() {
  const { user } = useSelector((state) => state.auth);
  const { claims, isLoading, isError, isSuccess, message} = useSelector((state) => state.claims);
  
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
    dispatch(getclaims());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  const [claimDescription, setClaimDescription] = useState('');

  const addClaim = (e) => {
    e.preventDefault();

    const newClaim = {
      claim_date: new Date().toLocaleDateString(),
      claim_description: claimDescription,
      farmer: "Festo",
      status: "pending"
    };

    dispatch(addclaim(newClaim));
    setClaimDescription('');
    alert('claim added successful ...');
  };
 
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="health">
        
        <section className='form'>
        <h2>Make A Claim</h2>
          <form action="" >
            <div className='form-group'>
              <label htmlFor="">Claim Message</label>
              <textarea
                className='form-control'
                value={claimDescription}
                onChange={(e) => setClaimDescription(e.target.value)}
              />
              <button onClick={addClaim}>Make A Claim</button>
            </div>
          </form>
        </section>
        <h2>Claims</h2>
        <table>
          <thead>
            <tr>
              <th>Claim Date</th>
              <th>Farmer</th>
              <th>Claim Description</th>
              <th>Claim Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          {claims.length > 0 ? (
            <tbody>
              {claims.map((claim, index) => (
                <tr key={index}>
                  <td>{claim.claim_date}</td>
                  <td>{claim.farmer}</td>
                  <td>{claim.claim_description}</td>
                  <td>{claim.status}</td>
                  <td><input type="text" /></td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="4">No Claims yet</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default Claims;
