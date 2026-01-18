import React from 'react';
import { Card, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { User } from 'shared/types/user';
import { formatDate } from 'shared/utils/formatDate';

const { Title, Text } = Typography;

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      style={{ marginBottom: 16, cursor: onClick ? 'pointer' : 'default' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Avatar
          size={64}
          src={user.avatar}
          icon={!user.avatar && <UserOutlined />}
        />
        <div style={{ flex: 1 }}>
          <Title level={5} style={{ margin: 0, marginBottom: 8 }}>
            {user.name}
          </Title>
          <div style={{ marginBottom: 4 }}>
            <Text type="secondary">Email: </Text>
            <Text>{user.email}</Text>
          </div>
          <div style={{ marginBottom: 4 }}>
            <Text type="secondary">Телефон: </Text>
            <Text>{user.phone}</Text>
          </div>
          {user.createdAt && (
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Создан: {formatDate(user.createdAt)}
              </Text>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};