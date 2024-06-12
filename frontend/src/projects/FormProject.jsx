import React from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Form, InputNumber, Tag, Button, Input } from 'antd'

const requiredMark = (labek, { required }) => (
  <>
    {required && <Tag color="error">Required</Tag>}
    {labek}
  </>
)

const handleBuy = (form, onFinish) => {
  form.validateFields().then((values) => {
    onFinish(values)
    form.resetFields()
  })
}

const FormProject = ({ open, onFinish, onClose, isLoading }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      title="Nuevo Proyecto"
      open={open}
      onOk={() => {
        handleBuy(form, onFinish)
      }}
      onCancel={onClose}
      centered
      footer={(_) => (
        <>
          <Button key="back" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            key="submit"
            loading={isLoading}
            onClick={() => handleBuy(form, onFinish)}
          >
            Crear
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
          endDate: '',
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

export default FormProject
