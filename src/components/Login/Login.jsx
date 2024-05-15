import {
  Button,
  Row,
  Col,
  Card,
  Typography,
  Flex,
  Divider,
  Form,
  Input,
} from 'antd'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { FacebookFilled, GoogleOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { QuestionCircleFilled } from '@ant-design/icons'
import { Helmet } from 'react-helmet-async'

const { Title, Text } = Typography

const Login = () => {
  const { googleLogin, facebookLogin, login } = useContext(UserContext)
  const { user } = useContext(UserContext)

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (user.logged === true && user.phone !== null) {
      navigate(-1)
    } else if (user.logged === true && user.phone === null) {
      navigate('/verificar-numero')
    }
  }, [user.logged, user.phone, navigate])

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const onFinish = (values) => {
    login(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Helmet>
        <title>Inicia sesión - Card Market</title>
        <meta name="description" content="Card Market - Compra y vende cartas de Magic: The Gathering" />
      </Helmet>
      <Row justify="center">
        <Col xs={24} md={12} lg={12} xl={8}>
          <Card>
            <Title level={3}>Inicia sesión</Title>
            <Divider></Divider>
            <Flex gap={8} vertical>
              <Title level={5}>Ingresa con tus redes</Title>
              <Button onClick={googleLogin} size="large">
                <GoogleOutlined style={{ color: 'red' }} />
                Ingresa con Google
              </Button>
              <Button disabled onClick={facebookLogin} size="large">
                <FacebookFilled style={{ color: 'blue' }} />
                Ingresa con Facebook
              </Button>
            </Flex>
            <Divider></Divider>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
              layout="vertical"
            >
              <Form.Item
                label="Correo"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input
                  size="large"
                  onChange={handleInputChange}
                  value={values.email}
                  name="email"
                  placeholder="Ej: juan@email.com"
                />
              </Form.Item>

              <Form.Item
                label="Contraseña"
                name="password"
                style={{ marginBottom: '1rem' }}
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  onChange={handleInputChange}
                  value={values.password}
                  name="password"
                />
              </Form.Item>
              <Flex style={{ marginBottom: '1rem' }} justify="end">
                <Button
                  icon={<QuestionCircleFilled />}
                  type="link"
                  size="small"
                  disabled
                >
                  Olvidé mi contrasena
                </Button>
              </Flex>
              <Form.Item>
                <Button block size="large" type="primary" htmlType="submit">
                  Ingresar
                </Button>
              </Form.Item>
            </Form>
            <Divider></Divider>
            <Flex>
              <Text>¿No tienes una cuenta?</Text>
              <Link to="/registro">
                <Button type="link" size="small">
                  Crea una cuenta
                </Button>
              </Link>
            </Flex>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Login
