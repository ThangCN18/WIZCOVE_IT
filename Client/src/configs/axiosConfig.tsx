import axios from 'axios'

const api = axios.create({
  baseURL: 'https://couresron.herokuapp.com'
})

export default api