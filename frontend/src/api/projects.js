import apiBase from './apiBase'

export const getProjects = async () => {
  try {
    const response = await apiBase.get('projects/')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const postProject = async (project) => {
  try {
    const response = await apiBase.post('projects/', project)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
