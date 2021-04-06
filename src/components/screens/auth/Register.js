import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Typography, Input, Button, Space, Modal, Spin, Divider, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined } from '@ant-design/icons';
import { Singup } from '../../../helpers/apis/Auth';
import MessageHandler from '../../component/MessageHandler';

const Register = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const { Title, Text } = Typography;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [repit, setRepit] = useState('');
    const [id, setId] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Mensaje del sistema',
            description:
                t("code.CO06"),
        });
    };

    const signUp = async () => {
        if (user === '' || pass === '' || repit === '' || id === '' || fullname === '' || phone === '' || address === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: t('code.CO01')
            });
        } else {
            if (pass !== repit) {
                Modal.info({
                    title: 'Mensaje del sistema',
                    content: t('code.CO04')
                });
            } else {
                const obj = {
                    username: user,
                    password: pass,
                    confirm: repit,
                    dni: id,
                    fullname: fullname,
                    phone: phone,
                    address: address
                };
                setIsLoading(true);
                const response = await Singup(obj);
                if (response.statusCode === 200) {
                    openNotificationWithIcon('success');
                    history.push('/auth/login');
                } else {
                    setIsLoading(false);
                    MessageHandler(response.message);
                }
            }
        }
    }

    return (
        <Row>
            <Col span={24}>
                <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', height: '20vh' }}>
                    <Col span={12}>
                        <Space direction='vertical'>
                            <Title>{t("app.ME15")}</Title>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', height: '70vh' }}>
                    <Col span={12}>
                        <Space direction='vertical'>
                            <Input onChange={(e) => { setUser(e.target.value) }} style={{ marginTop: 20 }} placeholder={t('app.ME01')} />
                            <Input.Password onChange={(e) => { setPass(e.target.value) }} placeholder={t('app.ME02')} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                            <Input.Password onChange={(e) => { setRepit(e.target.value) }} placeholder={t('app.ME16')} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                            <Divider />
                            <Input onChange={(e) => { setId(e.target.value) }} placeholder={t('app.ME17')} />
                            <Input onChange={(e) => { setFullname(e.target.value) }} placeholder={t('app.ME18')} />
                            <Input onChange={(e) => { setPhone(e.target.value) }} placeholder={t('app.ME19')} />
                            <Input onChange={(e) => { setAddress(e.target.value) }} placeholder={t('app.ME20')} />
                            {isLoading ?
                                <Spin indicator={antIcon} style={{ alignSelf: 'center', color: '#2F9264' }} /> :
                                <Button type="primary" block onClick={signUp}>
                                    {t('app.ME22')}
                                </Button>}
                        </Space>
                    </Col>
                </Row>
                <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center' }}>
                    <Link to="/auth/login"><Button type="text"><Text strong>{t('app.ME21')}</Text></Button></Link>
                </Row>
            </Col>
        </Row>
    );
}

export default Register;