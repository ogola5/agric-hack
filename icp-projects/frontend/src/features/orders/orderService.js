import axios from 'axios'

// Get user orders
const getorders = async (token) => {
 
//call get orders Function here

  // const response = await axios.get()

  // return response.data
}

const addorder = async (orderData) => {

  //call addOrder Function here

  // const response = await axios.post( orderData)

  // return response.data
}

const orderService = {
  getorders,
  addorder,
}


export default orderService
