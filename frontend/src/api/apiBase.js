import axios from 'axios'

const apiURL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/'

const apiBase = axios.create({
  baseURL: apiURL,
})

export default apiBase
