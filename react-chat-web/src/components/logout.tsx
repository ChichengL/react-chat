import { CloseOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router';

const logout: FC = (props) => {
  const navigate = useNavigate();
  return (
    <Tooltip title="Logout" placement="bottom">
      <Button
        onClick={() => {
          localStorage.clear();
          navigate('/');
        }}
      >
        <CloseOutlined />
      </Button>
    </Tooltip>
  );
};
export default logout;
