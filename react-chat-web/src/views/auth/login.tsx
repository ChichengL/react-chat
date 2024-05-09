import {
  Form,
  type FormProps,
  Button,
  Checkbox,
  Input,
  message as messageApi
} from 'antd';
import { LoginFormType } from './type';
import React from 'react';
import { useNavigate } from 'react-router';
import style from './index.module.scss';
import { Link } from 'react-router-dom';
import { usernameRules, passwordRules } from './configuration';
import { loginRoute } from '@/services/AllRoutes';
import axios from '@/services/request';

const wrapperCol = { offset: 6, span: 16 };

export default function Login() {
  const [formData, setFormData] = React.useState<LoginFormType>({
    username: '',
    password: '',
    remember: false
  });
  const [formSubmitStatus, setFormSubmitStatus] = React.useState<any>();
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const onFinishFailed: FormProps<LoginFormType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('错误:', errorInfo);
  };
  const onFinish: FormProps<LoginFormType>['onFinish'] = async (values) => {
    const { username, password } = values;
    const  res  = await axios.post(loginRoute, {
      username,
      password
    });
      const { data } = res;
    console.log('login res', res);
    setFormData({ ...formData, username, password });
    setFormSubmitStatus(data);
  };

  React.useEffect(() => {
    if (formSubmitStatus) {
      if (formSubmitStatus.code == 200) {
        messageApi.success('登录成功');
        localStorage.setItem(
          `chatRoomUser`,
          JSON.stringify(formSubmitStatus.user)
        );
        navigate('/home');
      } else {
        messageApi.error(`${formSubmitStatus.message}`);
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
        <Form.Item<LoginFormType>
          label="用户名"
          name="username"
          rules={usernameRules}
          key="username"
        >
          <Input onChange={(e) => handleInputChange(e)} name="username" />
        </Form.Item>

        <Form.Item<LoginFormType>
          label="密码"
          name="password"
          key="password"
          rules={passwordRules}
        >
          <Input.Password
            name="password"
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Item>

        <Form.Item wrapperCol={wrapperCol} key="help">
          <Link to="/forgotPassword">忘记密码?</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to="/register">注册</Link>
        </Form.Item>

        <Form.Item<LoginFormType>
          name="remember"
          valuePropName="checked"
          wrapperCol={wrapperCol}
          key="remember"
        >
          <Checkbox name="remember" checked={formData.remember}>
            {' '}
            记住我
          </Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={wrapperCol} key="submit">
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
