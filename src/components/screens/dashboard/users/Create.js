import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Row, Col, Layout, Card, Input, Button, Modal, notification, Spin, Divider, Space } from 'antd';
import { LoadingOutlined, EyeInvisibleOutlined, EyeTwoTone, } from '@ant-design/icons';
import { Singup } from '../../../../helpers/apis/Auth';
import MessageHandler from '../../../component/MessageHandler';

const Create = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [repit, setRepit] = useState('');
    const [id, setId] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
                    history.push('/dashboard/users');
                } else {
                    setIsLoading(false);
                    MessageHandler(response.message);
                }
            }
        }
    }

    return (
        <Layout style={{ background: 'white' }}>
            <Row style={{ margin: 20 }}>
                <Col span={8} style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Breadcrumb>
                        <Breadcrumb.Item>{t('app.ME23')}</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/users'}>{t('app.ME05')}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/users/create'}>{t('app.ME24')}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24}>
                    <Card title={t('app.ME30')} headStyle={{ background: '#2F9264', color: 'white' }}>
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
                                </Space>
                            </Col>
                        </Row>
                        <Row>
                            {isLoading ?
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                    <Spin indicator={antIcon} />
                                </Col> :
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center' }}>
                                    <Button type="primary" onClick={signUp}>{t('app.ME22')}</Button>
                                    <Link to={'/dashboard/users'}>
                                        <Button style={{ marginLeft: 5, marginRight: 10 }}>{t('app.ME21')}</Button>
                                    </Link>
                                </Col>}
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
}

export default Create;