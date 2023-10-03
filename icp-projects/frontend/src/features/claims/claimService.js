import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL + '/api/claims/'
// Get user transactions
const getclaims = async (token) => {
 
  const response = await axios.get(API_URL)

  return response.data
}

const addclaim = async (claimData) => {

  const response = await axios.post(API_URL , claimData)

  return response.data
}

const claimService = {
  getclaims,
  addclaim,
}


export default claimService
