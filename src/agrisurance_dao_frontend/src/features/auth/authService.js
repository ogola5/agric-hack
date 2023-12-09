import axios from 'axios'


import contract from "../../../../agrisurance_dao_backend/src/lib.rs"

const getUsers = async () => {
  const response = await contract.getUsers();

  return response.data
}
// Register user
const register = async (userData) => {
  const response = await contract.register(userData)
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

  const response = await contract.login(userData)
  //call register function here

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
