import apiBase from './apiBase'

export const getTasks = async () => {
  try {
    const response = await apiBase.get('tasks/')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getTask = async (id) => {
  try {
    const response = await apiBase.get(`tasks/${id}/`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const postTask = async (task) => {
  try {
    const response = await apiBase.post('tasks/', task)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const putTask = async (id, task) => {
  try {
    const response = await apiBase.put(`tasks/${id}/`, task)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteTask = async (id) => {
  try {
    const response = await apiBase.delete(`tasks/${id}/`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getTasksByProject = async (id) => {
  try {
    const response = await apiBase.get(`tasks/project/${id}/`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
