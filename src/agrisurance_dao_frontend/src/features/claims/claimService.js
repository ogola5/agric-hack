import axios from 'axios'
import contract from "../../../../agrisurance_dao_backend/src/lib.rs"

// Get user transactions
const getclaims = async (token) => {
 
  const response = await contract.getClaims(token);

  return response.data
}

const addclaim = async (claimData) => {

  const response = await contract.addclaim(token,claimData);

  return response.data
}

const claimService = {
  getclaims,
  addclaim,
}


export default claimService
