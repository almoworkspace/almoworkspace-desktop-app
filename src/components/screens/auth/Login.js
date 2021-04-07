import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Typography, Input, Button, Space, Modal, Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined } from '@ant-design/icons';
import { Login as LoginAction } from '../../../actions/authActions';
import logo from '../../../assets/images/Logo-ALMO-PNG-Transparente.png';

const Login = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading);
    const { t, i18n } = useTranslation();
    const { Title, Text } = Typography;
    const { Option } = Select;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [goTo, setGoTo] = useState(false);

    const signIn = () => {
        if (user === '' || pass === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: t('code.CO01')
            });
        } else {
            const obj = {
                username: user,
                password: pass
            };
            dispatch(LoginAction(obj));
        }
    }

    const handleChange = (e) => {
        if (e === 'es') {
            i18n.changeLanguage('es');
        } else {
            i18n.changeLanguage('en');
        }
    }

    return (
        <Row>
            <Col span={24}>
                <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', height: '80vh' }}>
                    <Col span={12}>
                        <Space direction='vertical'>
                            <img src={logo} style={{ height: 150, width: 250, alignSelf: 'center' }} />                            
                            <Input onPressEnter={signIn} onChange={(e) => { setUser(e.target.value) }} style={{ marginTop: 20 }} prefix={<UserOutlined />} placeholder={t('app.ME01')} />
                            <Input.Password onPressEnter={signIn} onChange={(e) => { setPass(e.target.value) }} placeholder={t('app.ME02')} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                            {isLoading ?
                                <Spin indicator={antIcon} style={{ alignSelf: 'center', color: '#2F9264' }} /> :
                                <Button type="primary" block onClick={signIn}>
                                    {t('app.ME03')}
                                </Button>}
                            <Text style={{ marginTop: 10 }}>{t("app.ME13")} <Link to="/auth/register"><Button type="text" style={{ marginLeft: -10 }}><Text strong>{t("app.ME14")}</Text></Button></Link></Text>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Select defaultValue="es" onChange={(e) => { handleChange(e) }}>
                        <Option value="es">Español</Option>
                        <Option value="en">English</Option>
                    </Select>
                    <Text strong style={{ marginTop: 10 }}>Almo Workspace © 2021. V1.0.2</Text>
                </Row>
            </Col>
        </Row>
    );
}

export default Login;