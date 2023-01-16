import { api } from 'boot/axios'

export const getAllLists = () => {
  return api.get('/lists')
}
