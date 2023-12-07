import axios from 'axios'

const getUsers = async () => {
  const response = await axios.get(`call get users function here`)

return response.data
}
// Register user
const register = async (userData) => {
  // const response = await axios.post(userData)

  //call register function here

  // if (response.data) {
  //   localStorage.setItem('user', JSON.stringify(response.data))
  // }

  // return response.data
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
  // const response = await axios.post(userData)


   //call login function here

  // if (response.data) {
  //   localStorage.setItem('user', JSON.stringify(response.data))
  // }

  // return response.data
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
