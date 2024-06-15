import React from 'react'
import { Flex, Typography } from 'antd'
import { PiProjectorScreenChartFill } from 'react-icons/pi'
import { FaCalendarCheck, FaCalendar } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const StyledButton = styled(Flex)`
  border-radius: 12px;
  border: 1px solid #d9d9d9;
  padding: 24px;
  font-size: 16px;
  background-color: #fff;
  font-weight: bold;
  color: #001529;
  cursor: pointer;
  transition: all 0.3s ease;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 260px;
  height: 260px;
  &:hover {
    background-color: #fafafa;
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }
`

const ProjectName = styled(Typography.Title)`
  margin: 0;
  color: #001529;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
`

const DateText = styled(Typography.Text)`
  margin: 0;
  color: #001529;
`

const CreatedProject = ({ project }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/projects/${project?.id_project}`)
  }

  return (
    <StyledButton vertical gap={16} onClick={handleClick}>
      <PiProjectorScreenChartFill size={70} />
      <Flex vertical align="center" style={{ flex: 1 }}>
        <ProjectName level={3} style={{ fontWeight: 400 }}>
          {project?.project_name}
        </ProjectName>
        <Flex vertical justify="center">
          <Flex align="center" gap={8}>
            <FaCalendar size={16} color="#8B0000" />
            <DateText style={{ fontWeight: 300 }}>
              {project?.start_date}
            </DateText>
          </Flex>
          <Flex align="center" gap={8}>
            <FaCalendarCheck size={16} color="#023020" />
            <DateText style={{ fontWeight: 300 }}>{project?.end_date}</DateText>
          </Flex>
        </Flex>
      </Flex>
    </StyledButton>
  )
}

export default CreatedProject
