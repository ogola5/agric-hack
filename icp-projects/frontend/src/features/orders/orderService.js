import axios from 'axios'
import consumers from "../../../../consumer/src/index"

// Get user orders
const getorders = async (token) => {
 
//call get orders Function here

  const response = await axios.get(consumers.getorders(token))

  return response.data
}

const addorder = async (orderData) => {

  //call addOrder Function here

  const response = await axios.post(consumers.addorder(token, orderData))

  return response.data
}

const orderService = {
  getorders,
  addorder,
}


export default orderService
