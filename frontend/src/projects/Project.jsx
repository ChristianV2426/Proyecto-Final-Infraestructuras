import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProject, putProject, deleteProject } from '../api/projects'
import { getTasks } from '../api/tasks'
import styled from 'styled-components'
import { PiProjectorScreenChartFill } from 'react-icons/pi'
import FormEditProject from './FormEditProject'
import { useNavigate } from 'react-router-dom'
import Tasks from '../tasks/Tasks'

import ProjectsData from '../data/projects.json'
import TasksData from '../data/tasks.json'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const Content = styled.div`
  flex: 1;
  padding: 24px;
`

const Sidebar = styled.div`
  border-radius: 12px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #fff;
  min-width: 300px;
  min-height: 500px;
`

const IconContainer = styled.div`
  margin-bottom: 20px;
`

const Project = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await getProject(id)
        setProject(projectData)
        const tasks = await getTasks()
        if (tasks.length === 0) {
          return
        }
        const projectTasks = tasks?.filter((task) => task.id_project == id)
        setTasks(projectTasks || [])
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  // useEffect(() => {
  //   const projectData = ProjectsData.find((p) => p.id_project == id)
  //   setProject(projectData)
  //   setLoading(false)
  // }, [id])

  const onEdit = async (values) => {
    try {
      const projectData = await putProject(id, values)
      setProject(projectData)
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  const onDelete = async () => {
    try {
      await deleteProject(id)
      navigate('/projects')
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  return (
    <Container>
      <Sidebar>
        <IconContainer>
          <PiProjectorScreenChartFill size={90} color="#001529" />
        </IconContainer>
        {loading ? (
          <p>Cargando información del proyecto...</p>
        ) : (
          <>
            <FormEditProject
              project={project}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </>
        )}
      </Sidebar>
      <Content>
        <Tasks tasks={tasks} />
      </Content>
    </Container>
  )
}

export default Project
