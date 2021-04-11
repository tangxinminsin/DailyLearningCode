import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useModel } from 'umi';

import './index.less';

export default function Login() {
  const { login } = useModel('global', ({ login }) => ({ login }));

  function onFinish(values) {
    login(values);
  }

  return (
    <div styleName="container">
      <div styleName="form-container">
        <Form
          name="form"
          initialValues={{ userName: 'admin' }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="用户名"
            name="userName"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
