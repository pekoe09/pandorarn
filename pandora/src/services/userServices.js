import axios from 'axios'

const baseUrl = '/api/users'

const attemptRegister = async (user) => {
  const response = await axios.post(`${baseUrl}/register`, user)
  return response.data
}

const attemptLogin = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  
  if (response.data) {
    localStorage.setItem('pandorauser', JSON.stringify(response.data))
  }
  return response.data
}

const attemptLogout = () => {
  localStorage.removeItem('pandorauser')
}

export {
  attemptLogin,
  attemptLogout,
  attemptRegister
}