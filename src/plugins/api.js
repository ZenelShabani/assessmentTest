import axios from "axios";

const API_HOST = 'https://api.github.com'

export const request = (method, url, {commit}, namespace, add = false) => {
  commit(`${namespace}_SET_ERROR`, null)
  return axios({
    method,
    url: API_HOST + url
  })
    .then(response => response.data)
    .then(data => {
      if (add) {
        commit(`${namespace}_ADD_ITEMS`, data)
      } else {
        commit(`${namespace}_SET_ITEMS`, data)
      }
      return data
    })
    .catch(e => {
      commit(`${namespace}_SET_ERROR`, e.message)
    })
}
