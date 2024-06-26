import React from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Form, Tag, Button, Input } from 'antd'
import { MdSave } from 'react-icons/md'
import { MdCancel } from 'react-icons/md'

const requiredMark = (labek, { required }) => (
  <>
    {required && <Tag color="error">Requerido</Tag>}
    {labek}
  </>
)

const handleCreateProject = (form, onFinish) => {
  form.validateFields().then((values) => {
    onFinish(values)
    form.resetFields()
  })
}

const FormCreateProject = ({ open, onFinish, onClose, isLoading }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      title="Nuevo Proyecto"
      open={open}
      onOk={() => {
        handleCreateProject(form, onFinish)
      }}
      onCancel={onClose}
      centered
      footer={(_) => (
        <>
          <Button
            key="submit"
            loading={isLoading}
            onClick={() => handleCreateProject(form, onFinish)}
            type="primary"
            ghost
          >
            <MdSave size={20} />
            Crear
          </Button>
          <Button key="back" onClick={onClose} danger ghost>
            <MdCancel size={20} />
            Cancelar
          </Button>
        </>
      )}
      confirmLoading={isLoading}
    >
      <Form
        initialValues={{
          project_name: '',
          project_description: '',
          start_date: '',
          end_date: '',
        }}
        requiredMark={requiredMark}
        size="large"
        layout="vertical"
        form={form}
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
          hasFeedback
          validateTrigger={['onChange', 'onBlur']}
          tooltip="Este es el nombre del proyecto"
        >
          <Input placeholder="Nombre del proyecto" />
        </Form.Item>
        <Form.Item
          label="Descripción"
          name="project_description"
          tooltip="Esta es la descripción del proyecto"
        >
          <Input.TextArea placeholder="Descripción del proyecto" rows={4} />
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
          hasFeedback
          validateTrigger={['onChange', 'onBlur']}
          tooltip="Esta es la fecha de inicio del proyecto"
        >
          <Input placeholder="Fecha de inicio del proyecto" type="date" />
        </Form.Item>
        <Form.Item
          label="Fecha de finalización"
          name="end_date"
          tooltip="Esta es la fecha de finalización del proyecto"
        >
          <Input placeholder="Fecha de finalización del proyecto" type="date" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormCreateProject
