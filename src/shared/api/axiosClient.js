import axios from 'axios'

// Axios instance for non-authenticated requests
const axiosClient = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Axios instance for authenticated requests
const axiosAuthClient = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials (cookies) for authenticated requests
})

export { axiosAuthClient, axiosClient }
