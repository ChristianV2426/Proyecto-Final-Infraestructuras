import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import NewProject from './NewProject'
import CreatedProject from './CreatedProject'
import { getProjects, postProject } from '../api/projects'
import FormCreateProject from './FormCreateProject'
import { message } from 'antd'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  width: 100%;
  height: 100%;
`

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)

  const showError = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
      duration: 3,
    })
  }

  const onFinish = async (values) => {
    const _values = {
      ...values,
      end_date: values.end_date || null,
    }

    setLoading(true)
    try {
      await postProject(_values)
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      error?.response?.status == 400 &&
        showError(
          error?.response?.data?.project_name?.[0] ||
            'Ocurrió un error creando el proyecto'
        )
      console.error('Error creating project:', error)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <GridContainer>
      {contextHolder}
      {projects?.map((project) => (
        <CreatedProject key={project.id} project={project} />
      ))}
      <NewProject onOpen={onOpen} />
      <FormCreateProject
        open={open}
        onClose={onClose}
        onFinish={onFinish}
        isLoading={loading}
      />
    </GridContainer>
  )
}

export default Projects
