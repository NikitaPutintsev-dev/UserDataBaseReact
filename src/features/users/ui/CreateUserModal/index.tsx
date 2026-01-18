import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useCreateUser } from '../../model/useUsers';
import { CreateUserDto } from 'shared/types/user';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  onClose,
}) => {
  const [form] = Form.useForm();
  const createUser = useCreateUser();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const userData: CreateUserDto = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        avatar: values.avatar,
      };

      await createUser.mutateAsync(userData);
      message.success('Пользователь успешно создан');
      form.resetFields();
      onClose();
    } catch (error: any) {
      if (error && error.errorFields) {
        // Validation error - form validation failed
        return;
      }
      message.error('Ошибка при создании пользователя');
      console.error('Create user error:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Создать пользователя"
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Отмена
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={createUser.isPending}
          onClick={handleSubmit}
        >
          Создать
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
        >
          <Input placeholder="Введите имя" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Пожалуйста, введите email' },
            { type: 'email', message: 'Введите корректный email' },
          ]}
        >
          <Input placeholder="Введите email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Телефон"
          rules={[{ required: true, message: 'Пожалуйста, введите телефон' }]}
        >
          <Input placeholder="Введите телефон" />
        </Form.Item>

        <Form.Item
          name="avatar"
          label="URL аватара (необязательно)"
          rules={[{ type: 'url', message: 'Введите корректный URL' }]}
        >
          <Input placeholder="Введите URL аватара" />
        </Form.Item>
      </Form>
    </Modal>
  );
};