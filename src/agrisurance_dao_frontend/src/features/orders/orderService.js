import axios from 'axios'
import consumers from "../../../../consumer/src/index"

// Get user orders
const getorders = async (token) => {
 
  const response = await contract.getOrders(token);

  return response.data
}

const addorder = async (orderData) => {

  const response = await contract.addOrder(token, orderData);

  return response.data
}


const orderService = {
  getorders,
  addorder,
}


export default orderService
