import React, { useEffect, useState } from 'react'
import { Flex } from 'antd'
import NewProject from './NewProject'
import CreatedProject from './CreatedProject'
import { getProjects, postProject } from '../api/projects'
import FormProject from './FormProject'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      await postProject(values)
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
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
    <Flex gap={24}>
      {projects?.map((project) => (
        <CreatedProject key={project.id} project={project} />
      ))}
      <NewProject onOpen={onOpen} />
      <FormProject
        open={open}
        onClose={onClose}
        onFinish={onFinish}
        isLoading={loading}
      />
    </Flex>
  )
}

export default Projects
