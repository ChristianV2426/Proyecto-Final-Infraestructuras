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

const handleCreateTask = (form, onCreate) => {
  form.validateFields().then((values) => {
    onCreate(values)
    form.resetFields()
  })
}

const handleEditTask = (form, onEdit) => {
  form.validateFields().then((values) => {
    onEdit(values)
    form.resetFields()
  })
}

const FormTask = ({ open, onCreate, onClose, isLoading, task }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      title="Nueva Tarea"
      open={open}
      onOk={() => {
        handleCreateTask(form, onCreate)
      }}
      onCancel={onClose}
      centered
      footer={(_) => (
        <>
          <Button
            key="submit"
            loading={isLoading}
            type="primary"
            ghost
            onClick={() => {
              handleCreateTask(form, onCreate)
            }}
          >
            <MdSave size={20} />
            Guardar
          </Button>
          <Button key="back" danger ghost onClick={onClose}>
            <MdCancel size={20} />
            Cancelar
          </Button>
        </>
      )}
      confirmLoading={isLoading}
    >
      <Form
        initialValues={{
          task_name: '',
          task_description: '',
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
          name="task_name"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el nombre de la tarea',
            },
          ]}
          hasFeedback
          validateTrigger={['onChange', 'onBlur']}
          tooltip="Este es el nombre de la tarea"
        >
          <Input placeholder="Nombre de la tarea" />
        </Form.Item>
        <Form.Item
          label="Descripción"
          name="task_description"
          tooltip="Esta es la descripción de la tarea"
        >
          <Input.TextArea placeholder="Descripción de la tarea" rows={4} />
        </Form.Item>
        <Form.Item
          label="Fecha de inicio"
          name="start_date"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese la fecha de inicio de la tarea',
            },
          ]}
          hasFeedback
          validateTrigger={['onChange', 'onBlur']}
          tooltip="Esta es la fecha de inicio de la tarea"
        >
          <Input placeholder="Fecha de inicio de la tarea" type="date" />
        </Form.Item>
        <Form.Item
          label="Fecha de finalización"
          name="end_date"
          tooltip="Esta es la fecha de finalización de la tarea"
        >
          <Input placeholder="Fecha de finalización de la tarea" type="date" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormTask
