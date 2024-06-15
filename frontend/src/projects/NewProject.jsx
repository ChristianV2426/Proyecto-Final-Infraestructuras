import React from 'react'
import { Flex, Typography } from 'antd'
import { PiProjectorScreenChartFill } from 'react-icons/pi'
import { IoAdd } from 'react-icons/io5'
import styled from 'styled-components'

const StyledButton = styled(Flex)`
  border: dashed 2px #536878;
  justify-content: center;
  align-items: center;
  padding: 16px 64px;
  font-size: 16px;
  color: #536878;
  cursor: pointer;
  transition: all 0.6s ease;
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-3px) scale(1.03);
  }
`

const NewProject = ({ onOpen }) => {
  return (
    <StyledButton vertical gap={16} onClick={onOpen}>
      <IoAdd size={70} color={'#3d4f5c'} />
      <Flex vertical align="center">
        <Typography.Title
          level={3}
          style={{ margin: 0, fontWeight: 700, color: '#3d4f5c' }}
        >
          Nuevo
        </Typography.Title>
        <Typography.Title
          level={3}
          style={{ margin: 0, fontWeight: 700, color: '#3d4f5c' }}
        >
          Proyecto
        </Typography.Title>
      </Flex>
    </StyledButton>
  )
}

export default NewProject
