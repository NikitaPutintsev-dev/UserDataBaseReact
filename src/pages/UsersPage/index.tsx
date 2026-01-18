import React, { useState } from 'react';
import { Layout, Button, Spin, message, Popconfirm } from 'antd';
import { PlusOutlined, LogoutOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useUsers, useDeleteUser } from 'features/users/model/useUsers';
import { UserCard } from 'entities/user/ui/UserCard';
import { CreateUserModal } from 'features/users/ui/CreateUserModal';
import { EditUserModal } from 'features/users/ui/EditUserModal';
import { useAuth } from 'features/auth/model/useAuth';
import { User } from 'shared/types/user';
import styled from 'styled-components';

const { Header, Content } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #001529;
  padding: 0 24px;
`;

const StyledContent = styled(Content)`
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 64px);
`;

const UserListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const UserCardWrapper = styled.div`
  position: relative;
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`;

const ActionButton = styled(Button)`
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h1`
  margin: 0;
  color: white;
  font-size: 20px;
`;

export const UsersPage: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();
  const { logout } = useAuth();
  const deleteUser = useDeleteUser();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser.mutateAsync(userId);
      message.success('Пользователь успешно удален');
    } catch (error) {
      message.error('Ошибка при удалении пользователя');
      console.error('Delete user error:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (error) {
    message.error('Ошибка при загрузке пользователей');
  }

  return (
    <Layout>
      <StyledHeader>
        <Title>База пользователей</Title>
        <div style={{ display: 'flex', gap: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Создать пользователя
          </Button>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </StyledHeader>
      <StyledContent>
        <UserListContainer>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: 50 }}>
              <Spin size="large" />
            </div>
          ) : (
            <div>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <UserCardWrapper key={user.id}>
                    <UserCard user={user} />
                    <ActionButtons>
                      <ActionButton
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(user)}
                        size="small"
                      />
                      <Popconfirm
                        title="Удалить пользователя?"
                        description="Вы уверены, что хотите удалить этого пользователя?"
                        onConfirm={() => handleDelete(user.id)}
                        okText="Да"
                        cancelText="Нет"
                      >
                        <ActionButton
                          type="primary"
                          danger
                          icon={<DeleteOutlined />}
                          size="small"
                        />
                      </Popconfirm>
                    </ActionButtons>
                  </UserCardWrapper>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: 50 }}>
                  <p>Пользователи не найдены</p>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    Создать первого пользователя
                  </Button>
                </div>
              )}
            </div>
          )}
        </UserListContainer>

        <CreateUserModal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />

        <EditUserModal
          open={!!editingUser}
          user={editingUser}
          onClose={() => setEditingUser(null)}
        />
      </StyledContent>
    </Layout>
  );
};