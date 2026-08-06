import { Card, Form, Input, Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function RegisterPage() {
  const navigate = useNavigate()

  const handleRegister = async (values) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/users/register',
        values
      )
      message.success('Đăng ký thành công')
      console.log('Register success:', response.data)
      navigate('/login')
    } catch (error) {
      const msg =
        error.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại'
      message.error(msg)
      console.log('Register error:', msg)
    }
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card title="Đăng ký" style={{ width: 400, textAlign: 'left' }}>
        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không đúng định dạng' },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng nhập lại mật khẩu' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp'))
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>
          <Button type="primary" block htmlType="submit">
            Đăng ký
          </Button>
        </Form>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>
      </Card>
    </div>
  )
}

export default RegisterPage
