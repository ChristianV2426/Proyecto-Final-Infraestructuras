import apiBase from './apiBase'

export const getProjects = async () => {
  try {
    const response = await apiBase.get('projects/')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getProject = async (id) => {
  try {
    const response = await apiBase.get(`projects/${id}/`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const postProject = async (project) => {
  try {
    const response = await apiBase.post('projects/', project)
    return response.data
  } catch (error) {
    throw error
  }
}

export const putProject = async (id, project) => {
  try {
    const response = await apiBase.put(`projects/${id}/`, project)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteProject = async (id) => {
  try {
    const response = await apiBase.delete(`projects/${id}/`)
    return response.data
  } catch (error) {
    throw error
  }
}
