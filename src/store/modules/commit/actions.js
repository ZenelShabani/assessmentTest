import {namespace} from './mutation-types'
import {request} from "~/plugins/api";

export const getItem = ({dispatch, commit}, id) =>
  request('GET', {dispatch, commit}, namespace, id)

export const getItems = ({dispatch, commit}, {user, repo, limit, page}) => {
  const url = `/repos/${user}/${repo}/commits?per_page=${limit}&page=${page}`
  return request('GET', url, {dispatch, commit}, namespace, true)
}

export const create = ({dispatch, commit, state}) =>
  console.log({dispatch, commit, state}, namespace)

export const update = ({dispatch, commit, state}) =>
  console.log({dispatch, commit, state}, namespace)

export const remove = ({dispatch, commit}, item) =>
  console.log({dispatch, commit}, namespace, item)

export const reset = ({commit}) => console.log({commit}, namespace)
