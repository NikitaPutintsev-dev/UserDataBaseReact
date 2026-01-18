import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routes } from 'shared/config/routes';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Result
        status="404"
        title="404"
        subTitle="Извините, страница, которую вы посетили, не существует."
        extra={
          <Button type="primary" onClick={() => navigate(routes.users)}>
            Вернуться на главную
          </Button>
        }
      />
    </Container>
  );
};