import axios from 'axios'
import { parseCookies } from 'nookies'

const isProduction = process.env.NODE_ENV === 'production'

const api = axios.create({
  baseURL: isProduction ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_LOCAL_API_URL
})

api.interceptors.request.use((config) => {
  const { feedbackId } = parseCookies()

  if (feedbackId) {
    config.headers.Authorization = `feedbackId ${feedbackId}`
  }

  return config
})

export { api }
