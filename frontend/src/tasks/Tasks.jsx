import React, { useEffect, useState } from 'react'
import { Table, Button, Tag, Tooltip, Input, Form } from 'antd'
import { IoAdd } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import { IoMdTrash } from 'react-icons/io'
import { MdSaveAs } from 'react-icons/md'
import { MdCancel } from 'react-icons/md'

import FormTask from './FormTask'

const editableCell = ({
  editing,
  title,
  inputType,
  children,
  dataIndex,
  record,
  index,
  isRequired,
  requiredMessage,
  ...restProps
}) => {
  const inputNode =
    inputType === 'date' ? (
      <Input type="date" />
    ) : inputType === 'textarea' ? (
      <Input.TextArea rows={1} />
    ) : (
      <Input />
    )

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: isRequired,
              message: requiredMessage,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const Tasks = ({ tasks }) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const values = Form.useWatch([], form)
  useEffect(() => {
    form
      .validateFields()
      .then(() => {
        setIsSubmitting(true)
      })
      .catch(() => {
        setIsSubmitting(false)
      })
  }, [form, values])

  const isEditing = (record) => record.id_task === editingKey

  const handleEdit = (record) => {
    form.setFieldsValue({
      ...record,
    })
    setEditingKey(record.id_task)
  }

  const onCancel = () => {
    setEditingKey('')
  }

  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)

  const columns = [
    {
      title: 'Tarea',
      dataIndex: 'task_name',
      key: 'task_name',
      editable: true,
      isRequired: true,
      requiredMessage: 'El nombre es requerido',
    },
    {
      title: 'Descripción',
      dataIndex: 'task_description',
      key: 'task_description',
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
      editable: true,
      isRequired: false,
    },
    {
      title: 'Fecha de inicio',
      dataIndex: 'start_date',
      key: 'start_date',
      editable: true,
      isRequired: true,
      requiredMessage: 'La fecha de inicio es requerida',
    },
    {
      title: 'Fecha de fin',
      dataIndex: 'end_date',
      key: 'end_date',
      editable: true,
      isRequired: false,
    },
    {
      title: 'Estado',
      key: 'status',
      align: 'center',
      render: (text, record) => (
        <Tag color={record.end_date ? 'green' : 'red'}>
          {record.end_date ? 'Completada' : 'Pendiente'}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 150,
      align: 'center',
      render: (text, record) => {
        const editable = isEditing(record)
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {!editable ? (
              <>
                <Tooltip title="Editar">
                  <Button
                    type="text"
                    style={{ color: editingKey === '' ? '#1677ff' : '#AFCFFF' }}
                    disabled={editingKey !== ''}
                    onClick={() => handleEdit(record)}
                  >
                    <MdEdit size={20} />
                  </Button>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <Button
                    type="text"
                    style={{
                      color: editingKey === '' ? '#ff4d4f ' : '#FFB3B4',
                    }}
                    disabled={editingKey !== ''}
                  >
                    <IoMdTrash size={20} />
                  </Button>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Guardar">
                  <Button
                    type="text"
                    style={{ color: isSubmitting ? '#1677ff' : '#AFCFFF' }}
                    onClick={() => {}}
                    disabled={!isSubmitting}
                  >
                    <MdSaveAs size={20} />
                  </Button>
                </Tooltip>
                <Tooltip title="Cancelar">
                  <Button type="text" danger onClick={onCancel}>
                    <MdCancel size={20} />
                  </Button>
                </Tooltip>
              </>
            )}
          </div>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === 'start_date' || col.dataIndex === 'end_date'
            ? 'date'
            : col.dataIndex === 'task_description'
              ? 'textarea'
              : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        isRequired: col.isRequired,
        requiredMessage: col.requiredMessage,
      }),
    }
  })

  return (
    <>
      <Button
        type="primary"
        ghost
        style={{ marginBottom: '10px' }}
        onClick={onOpen}
      >
        <IoAdd size={20} />
        Tarea
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: editableCell,
            },
          }}
          columns={mergedColumns}
          dataSource={tasks}
          rowKey="id_task"
          bordered
          pagination={{ pageSize: 6, onChange: onCancel }}
          loading={loading}
        />
      </Form>
      <FormTask open={open} onClose={onClose} />
    </>
  )
}

export default Tasks
