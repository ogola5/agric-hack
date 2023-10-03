import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL + '/api/orders/'
// Get user orders
const getorders = async (token) => {
 
  const response = await axios.get(API_URL)

  return response.data
}

const addorder = async (orderData) => {

  const response = await axios.post(API_URL , orderData)

  return response.data
}

const orderService = {
  getorders,
  addorder,
}


export default orderService
