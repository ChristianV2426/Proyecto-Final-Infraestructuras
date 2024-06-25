import axios from 'axios'

const apiURL =
  'http://connection-service:8000'

const apiBase = axios.create({
  baseURL: apiURL,
})

export default apiBase
