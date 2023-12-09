import axios from 'axios'
import consumers from "../../../../consumer/src/index"
import farmers from "../../../../farmer/src/index"

// Get user transactions
const getclaims = async (token) => {
 
  const response = await axios.get(token, farmers.getclaims());

  return response.data
}

const addclaim = async (claimData) => {

  // call addclaim function here
  const response = await axios.post(farmers.addclaim(claimData))

  return response.data
}

const claimService = {
  getclaims,
  addclaim,
}


export default claimService
