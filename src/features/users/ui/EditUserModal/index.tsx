import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useUpdateUser } from '../../model/useUsers';
import { User, UpdateUserDto } from 'shared/types/user';

interface EditUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  user,
  onClose,
}) => {
  const [form] = Form.useForm();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (user && open) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
      });
    }
  }, [user, open, form]);

  const handleSubmit = async () => {
    if (!user) return;

    try {
      const values = await form.validateFields();
      const userData: UpdateUserDto = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        avatar: values.avatar,
      };

      await updateUser.mutateAsync({ id: user.id, data: userData });
      message.success('Пользователь успешно обновлен');
      form.resetFields();
      onClose();
    } catch (error: any) {
      if (error && error.errorFields) {
        // Validation error - form validation failed
        return;
      }
      message.error('Ошибка при обновлении пользователя');
      console.error('Update user error:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Редактировать пользователя"
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Отмена
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={updateUser.isPending}
          onClick={handleSubmit}
        >
          Сохранить
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