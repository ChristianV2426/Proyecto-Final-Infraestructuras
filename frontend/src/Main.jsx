import React from 'react'
import { Breadcrumb, Flex, Layout, Menu, theme, Typography } from 'antd'
import { FaProjectDiagram } from 'react-icons/fa'
import Projects from './projects/Projects'

const { Header, Content, Footer } = Layout
const { Title, Text } = Typography

const items = [
  {
    key: '1',
    label: 'Proyectos',
  },
]
const Main = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
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
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item>Proyectos</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            height: '100%',
          }}
        >
          <Projects />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Gestor Proyectos ©{new Date().getFullYear()} Created by IPD
      </Footer>
    </Layout>
  )
}

export default Main
