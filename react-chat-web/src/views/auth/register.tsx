import React from 'react';
import { Form, Input, Button, FormProps, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterFormType } from './type';
const wrapperCol = { offset: 6, span: 16 };
import style from './index.module.scss';
import {
  usernameRules,
  passwordRules,
  confirmPasswordRules
} from './configuration';
import axios from '@/services/request';

import { registerRoute } from '@/services/AllRoutes';

export default (): React.ReactElement => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [formSubmitStatus, setFormSubmitStatus] = React.useState<any>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const onFinishFailed: FormProps<RegisterFormType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('错误:', errorInfo);
  };
  const onFinish: FormProps<RegisterFormType>['onFinish'] = async (values) => {
    const { username, password } = values;
    const { data } = await axios.post(registerRoute, {
      username,
      password
    });
    console.log(data);
    setFormSubmitStatus(data);
  };

  React.useEffect(() => {
    if (formSubmitStatus) {
      if (formSubmitStatus.code === 200) {
        message.success('注册成功');
        console.log('formSubmitStatus.user', formSubmitStatus.user);
        localStorage.setItem(
          'chatRoomUser',
          JSON.stringify(formSubmitStatus.user)
        );
        navigate('/');
      } else {
        message.error(`注册失败: ${formSubmitStatus.message}`);
      }
    }
  }, [formSubmitStatus, navigate]);

  return (
    <div className={style['auth-container']}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={style['auth-form']}
      >
        <Form.Item<RegisterFormType>
          label="用户名"
          name="username"
          key="username"
          rules={usernameRules}
        >
          <Input
            onChange={(e) => handleInputChange(e)}
            name="username"
            value={form.username}
          />
        </Form.Item>

        <Form.Item<RegisterFormType>
          label="密码"
          name="password"
          key="password"
          rules={passwordRules}
        >
          <Input.Password
            name="password"
            onChange={(e) => handleInputChange(e)}
            value={form.password}
          />
        </Form.Item>

        <Form.Item<RegisterFormType>
          label="确认密码"
          name="confirmPassword"
          key="confirmPassword"
          rules={confirmPasswordRules}
        >
          <Input.Password
            name="confirmPassword"
            onChange={(e) => handleInputChange(e)}
            value={form.confirmPassword}
          />
        </Form.Item>

        <Form.Item wrapperCol={wrapperCol} key="help">
          <Link to="/login">注册完毕？点此返回登录</Link>
        </Form.Item>

        <Form.Item wrapperCol={wrapperCol} key="submit">
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
