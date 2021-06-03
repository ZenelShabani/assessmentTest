import {namespace} from './mutation-types'
import {request} from "~/plugins/api";

export const getItem = ({dispatch, commit}, id) =>
  request('GET', {dispatch, commit}, namespace, id)

export const getItems = ({dispatch, commit}, {user, sort}) => {
  const url = `/users/${user}/repos?sort=${sort}`
  request('GET', url, {dispatch, commit}, namespace)
}

export const create = ({dispatch, commit, state}) =>
  console.log({dispatch, commit, state}, namespace)

export const update = ({dispatch, commit, state}) =>
  console.log({dispatch, commit, state}, namespace)

export const remove = ({dispatch, commit}, item) =>
  console.log({dispatch, commit}, namespace, item)

export const reset = ({commit}) => console.log({commit}, namespace)
