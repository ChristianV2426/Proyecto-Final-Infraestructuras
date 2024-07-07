import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProject, putProject, deleteProject } from '../api/projects'
import { getTasks } from '../api/tasks'
import styled from 'styled-components'
import { PiProjectorScreenChartFill } from 'react-icons/pi'
import FormEditProject from './FormEditProject'
import { useNavigate } from 'react-router-dom'
import Tasks from '../tasks/Tasks'
import { message } from 'antd'

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
  const [messageApi, contextHolder] = message.useMessage()

  const navigate = useNavigate()

  const showError = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
      duration: 3,
    })
  }

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

  const onEdit = async (values) => {
    try {
      const projectData = await putProject(id, values)
      setProject(projectData)
    } catch (error) {
      error?.response?.status == 400 &&
        showError(
          error?.response?.data?.project_name?.[0] ||
            'Ocurrió un error creando el proyecto'
        )
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
        <Tasks tasks={tasks} setTasks={setTasks} idProject={id} />
      </Content>
    </Container>
  )
}

export default Project
