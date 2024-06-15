import React from 'react'
import { Flex, Typography } from 'antd'
import { PiProjectorScreenChartFill } from 'react-icons/pi'
import { FaCalendarCheck } from 'react-icons/fa6'
import { FaCalendar } from 'react-icons/fa6'
import styled from 'styled-components'

const StyledButton = styled(Flex)`
  border-radius: 0; /* Elimina el borde redondeado */
  border: none; /* Elimina el borde */
  padding: 16px;
  font-size: 16px;
  padding: 16px 64px;
  background-color: #f5f5f5;
  font-weight: bold;
  color: #001529;
  cursor: pointer;
  transition: all 0.6s ease;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-3px) scale(1.03);
  }
`

const ProjectName = styled(Typography.Title)`
  margin: 0;
  font-weight: 800;
  color: #001529;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StartDate = styled(Typography.Text)`
  margin: 0;
  color: #001529;
`

const EndDate = styled(Typography.Text)`
  margin: 0;
  color: #001529;
`

const CreatedProject = ({ project }) => {
  return (
    <StyledButton vertical gap={16} style={{ width: '240px' }}>
      <PiProjectorScreenChartFill size={70} />
      <Flex vertical align="center" style={{ flex: 1 }}>
        <ProjectName level={3}>{project?.project_name}</ProjectName>
        <Flex vertical justify="center">
          <Flex align="center" gap={5}>
            <FaCalendar size={15} color="#8B0000" />
            <StartDate level={3}>{project?.start_date}</StartDate>
          </Flex>
          <Flex align="center" gap={5}>
            <FaCalendarCheck size={15} color="#023020" />
            <EndDate level={3}>{project?.end_date}</EndDate>
          </Flex>
        </Flex>
      </Flex>
    </StyledButton>
  )
}

export default CreatedProject
