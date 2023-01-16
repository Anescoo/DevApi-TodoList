import { api } from 'boot/axios'

export const getAllLists = () => {
  return api.get('/lists')
}

export function addList (params) {
  return api.post('/lists', params)
}

export function modifyList (id, params) {
  return api.put(`/lists/${id}`, params)
}

export function deleteList (id) {
  return api.delete(`/lists/${id}`)
}
