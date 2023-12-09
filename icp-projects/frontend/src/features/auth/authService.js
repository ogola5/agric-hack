import axios from 'axios'

import consumers from "../../../../consumer/src/index"
import farmers from "../../../../farmer/src/index"

const getUsers = async () => {
  const response = await axios.get(farmers.getFarmers() && consumers.getConsumers())

  return response.data
}
// Register user
const register = async (userData) => {
  let response;
  if (userData.role === 'farmer') {
    response = await axios.post(farmers.register(userData))
  } else if (userData.role === 'consumer') {
    response = await axios.post(consumers.register(userData))
  }
  //call register function here

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}
//update User

const updateUser = async (userData, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // const response = await axios.put(API_URL + userId, userData, config)

  // return response.data
}
// Login user
const login = async (userData) => {

  let response;
  if (userData.role === 'farmer') {
    response = await axios.post(farmers.login(userData))
  } else if (userData.role === 'consumer') {
    response = await axios.post(consumers.login(userData))
  }


  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
  getUsers,
  updateUser
}

export default authService
