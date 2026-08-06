import { Card, Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/users/login",
        values,
      );
      message.success("Đăng nhập thành công");
      console.log("Login success:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Đăng nhập thất bại, vui lòng thử lại";
      message.error(msg);
      console.log("Login error:", msg);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card title="Đăng nhập" style={{ width: 400, textAlign: "left" }}>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không đúng định dạng" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>
          <Button type="primary" block htmlType="submit">
            Đăng nhập
          </Button>
        </Form>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
