import React, { useEffect, useState } from 'react'
import { Form, Tag, Input, Button } from 'antd'
import styled from 'styled-components'
import { MdEdit } from 'react-icons/md'
import { IoMdTrash } from 'react-icons/io'
import { MdSaveAs } from 'react-icons/md'
import { MdCancel } from 'react-icons/md'

const StyledForm = styled(Form)`
  .ant-form-item {
    ${(props) =>
      !props.isEditing &&
      `
      .ant-input, .ant-input-textarea {
        color: #000000;
      }
    `}
  }
`

const ButtonContainer = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const requiredMark = (label, { required }) => (
  <>
    {required && <Tag color="error">Requerido</Tag>}
    {label}
  </>
)

const handleEditProject = (form, onEdit, setIsEditing) => {
  form.validateFields().then((values) => {
    onEdit(values)
    setIsEditing(false)
  })
}

const handleDeleteProject = (id, onDelete, onBack) => {
  onDelete(id)
}

const FormEditProject = ({ project, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)

  const [form] = Form.useForm()

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        project_name: project.project_name,
        project_description: project.project_description,
        start_date: project.start_date,
        end_date: project.end_date,
      })
    }
  }, [project])

  useEffect(() => {
    if (!isEditing) {
      form.resetFields()
    }
  }, [isEditing])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <>
      <StyledForm
        initialValues={{
          project_name: project?.project_name || '',
          project_description: project?.project_description || '',
          start_date: project?.start_date || '',
          end_date: project?.end_date || '',
        }}
        requiredMark={isEditing && requiredMark}
        layout="vertical"
        form={form}
        isEditing={isEditing}
      >
        <Form.Item
          label="Nombre"
          name="project_name"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el nombre del proyecto',
            },
          ]}
          hasFeedback={isEditing}
          validateTrigger={['onChange', 'onBlur']}
          tooltip={isEditing ? 'Este es el nombre del proyecto' : ''}
        >
          <Input placeholder="Nombre del proyecto" disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          label="Descripción"
          name="project_description"
          tooltip={isEditing ? 'Esta es la descripción del proyecto' : ''}
        >
          <Input.TextArea
            placeholder="Descripción del proyecto"
            disabled={!isEditing}
            autoSize={{ minRows: 1, maxRows: 3 }}
          />
        </Form.Item>
        <Form.Item
          label="Fecha de inicio"
          name="start_date"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese la fecha de inicio del proyecto',
            },
          ]}
          hasFeedback={isEditing}
          validateTrigger={['onChange', 'onBlur']}
          tooltip={isEditing ? 'Esta es la fecha de inicio del proyecto' : ''}
        >
          <Input
            placeholder="Fecha de inicio del proyecto"
            type="date"
            disabled={!isEditing}
          />
        </Form.Item>
        <Form.Item
          label="Fecha de finalización"
          name="end_date"
          tooltip={
            isEditing ? 'Esta es la fecha de finalización del proyecto' : ''
          }
        >
          <Input
            placeholder="Fecha de finalización del proyecto"
            type="date"
            disabled={!isEditing}
          />
        </Form.Item>
      </StyledForm>
      <ButtonContainer>
        {isEditing ? (
          <Button
            type="primary"
            ghost
            onClick={() => handleEditProject(form, onEdit, setIsEditing)}
          >
            <MdSaveAs size={20} />
            Guardar
          </Button>
        ) : (
          <Button type="primary" ghost onClick={handleEdit}>
            <MdEdit size={20} />
            Editar
          </Button>
        )}
        {isEditing ? (
          <Button danger onClick={handleCancel}>
            <MdCancel size={20} />
            Cancelar
          </Button>
        ) : (
          <Button
            danger
            onClick={() => {
              handleDeleteProject(project?.id_project, onDelete)
            }}
          >
            <IoMdTrash size={20} />
            Eliminar
          </Button>
        )}
      </ButtonContainer>
    </>
  )
}

export default FormEditProject
