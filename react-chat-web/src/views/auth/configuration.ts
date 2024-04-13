export const usernameRules = [
  {
    required: true,
    message: '请输入用户名!'
  },
  {
    max: 10,
    message: '用户名长度不能超过10位!'
  },
  {
    message: '用户名不能数字开头',
    pattern: /^[a-zA-Z][a-zA-Z0-9_]{3,9}$/
  }
];

export const passwordRules = [
  {
    required: true,
    message: '请输入密码!'
  },
  {
    min: 6,
    message: '密码长度不能少于6位!'
  },
  {
    max: 16,
    message: '密码长度不能超过16位!'
  }
];

export const confirmPasswordRules = [
  ...passwordRules,
  ({ getFieldValue }: any) => ({
    validator(_rule: any, value: string) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      } else {
        return Promise.reject('两次输入的密码不一致!');
      }
    }
  })
];
