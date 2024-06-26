import axios from 'axios'

const apiURL = window.location.origin + '/api/'

const apiBase = axios.create({
  baseURL: apiURL,
})

export default apiBase
