import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProject } from '../api/projects'
import styled from 'styled-components'
import { Button, Table, Typography } from 'antd'

const { Title, Text } = Typography

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const Sidebar = styled.div`
  flex: 0 0 300px;
  background-color: #f0f2f5;
  padding: 24px;
  border-right: 1px solid #e8e8e8;
`

const Content = styled.div`
  flex: 1;
  padding: 24px;
`

const Tasks = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await getProject(id)
        setProject(projectData)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const columns = [
    {
      title: 'Tarea',
      dataIndex: 'task_name',
      key: 'task_name',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Asignado a',
      dataIndex: 'assignee',
      key: 'assignee',
    },
  ]

  const data = project?.tasks || []

  return (
    <Container>
      <Sidebar>
        {loading ? (
          <p>Cargando información del proyecto...</p>
        ) : (
          <>
            <Title level={3}>{project?.project_name}</Title>
            <Text strong>Descripción:</Text>
            <Text>{project?.project_description}</Text>
            <Text strong>Fecha de Inicio:</Text>
            <Text>{project?.start_date}</Text>
            <Text strong>Fecha de Finalización:</Text>
            <Text>{project?.end_date}</Text>
          </>
        )}
      </Sidebar>
      <Content>
        <div style={{ marginBottom: '16px' }}>
          <Link to={`/project/${id}/add-task`}>
            <Button type="primary">Agregar Tarea</Button>
          </Link>
        </div>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Content>
    </Container>
  )
}

export default Tasks
