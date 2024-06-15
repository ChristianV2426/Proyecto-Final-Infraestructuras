import React from 'react'
import styled from 'styled-components'
import { Breadcrumb, Flex, Layout, Menu, theme, Typography } from 'antd'
import { FaProjectDiagram } from 'react-icons/fa'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { useLocation } from 'react-router-dom'
import { RxDoubleArrowLeft } from 'react-icons/rx'

const { Header, Content } = Layout
const { Title, Text } = Typography

const ContainerDiv = styled.div`
  background: ${(props) => props.bgColor};
  min-height: 280px;
  padding: 24px;
  border-radius: ${(props) => props.borderRadius};
  height: auto;
  max-height: 80vh;
  overflow-y: auto;
  padding-right: 20px;
  border-radius: 4px;

  &::-webkit-scrollbar {
    width: 12px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 3px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  &:hover {
    &::-webkit-scrollbar {
      opacity: 1;
    }
  }
`

const items = [
  {
    key: '1',
    label: 'Proyectos',
  },
]

const parseBreadcrumbName = (name) => {
  switch (name) {
    case 'projects':
      return 'Proyectos'
    case 'project':
      return 'Proyecto'
    case 'tasks':
      return 'Tareas'
    default:
      return name
  }
}

const Main = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const location = useLocation()

  const renderBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x)

    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">Inicio</Link>
        </Breadcrumb.Item>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1
          return (
            <Breadcrumb.Item key={routeTo}>
              {isLast ? (
                <span>{parseBreadcrumbName(name)}</span>
              ) : (
                <Link to={routeTo}>{parseBreadcrumbName(name)}</Link>
              )}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    )
  }

  return (
    <Layout style={{ height: 'calc(100vh - 21px)' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Flex style={{ marginRight: '16px', cursor: 'pointer' }} gap={16}>
          <FaProjectDiagram size={50} color="white" />
          <Flex vertical style={{ marginRight: '16px' }}>
            <Title level={3} style={{ color: 'white', margin: 0 }}>
              Proyectos IPD
            </Title>
            <Text style={{ color: 'white' }}>
              Sistema de gestión de proyectos
            </Text>
          </Flex>
        </Flex>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
          height: '100%',
        }}
      >
        <Flex gap={16} align="center" justify="space-between">
          {renderBreadcrumbs()}
          {/\d+$/.test(location.pathname.split('/').pop()) && (
            <Link
              to="/"
              style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
            >
              <RxDoubleArrowLeft />
              Volver a Proyectos
            </Link>
          )}
        </Flex>
        <ContainerDiv bgColor={colorBgContainer} borderRadius={borderRadiusLG}>
          <Outlet />
        </ContainerDiv>
      </Content>
    </Layout>
  )
}

export default Main
