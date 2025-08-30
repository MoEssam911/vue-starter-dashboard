// src/composables/useDynamicCookies.js
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const useDynamicCookies = () => {
  const setCookie = (key, value, options = {}) => {
    const defaultOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      path: '/',
      secure: import.meta.env.PROD,
      sameSite: 'lax',
    }

    cookies.set(key, value, { ...defaultOptions, ...options })
  }

  const getCookie = (key) => {
    return cookies.get(key)
  }

  const removeCookie = (key) => {
    cookies.remove(key, { path: '/' })
  }

  return {
    setCookie,
    getCookie,
    removeCookie,
  }
}
