import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Row, Col, Layout, Card, Input, Button, Modal, notification, Spin, Divider, Space, Empty, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FindOne, Update as UpdateUser } from '../../../../helpers/apis/User';
import MessageHandler from '../../../component/MessageHandler';

const Update = ({ search }) => {
    const history = useHistory();
    const token = useSelector(state => state.auth.token);
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [verified, setVerified] = useState(0);
    const [id, setId] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isSearch, setIsSearch] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { Option } = Select;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        const request = async () => {
            const response = await FindOne(token, search);
            if (response.statusCode === 200) {
                setData(response.data);
                setVerified(response.data.verified);
                setFullname(response.data.Profile[0].fullname);
                setPhone(response.data.Profile[0].phone);
                setAddress(response.data.Profile[0].address);
                setId(response.data.Profile[0].dni);
                setIsSearch(false);
            } else {
                setData(null);
                MessageHandler(response.message);
                setIsSearch(false);
            }
        };
        request();
    }, []);

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Mensaje del sistema',
            description:
                t("code.CO18"),
        });
    };

    const handleChange = (e) => {
        setVerified(e);
    }

    const update = async () => {
        if (id === '' || fullname === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: t('code.CO01')
            });
        } else {
            const obj = {
                dni: id,
                fullname: fullname,
                phone: phone,
                address: address,
                verified: verified
            };
            setIsLoading(true);
            const response = await UpdateUser(token, search, obj);
            if (response.statusCode === 200) {
                openNotificationWithIcon('success');
                history.push('/dashboard/users');
            } else {
                setIsLoading(false);
                MessageHandler(response.message);
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
                            <Link to={`/dashboard/users/${search}`}>{t('app.ME28')}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24}>
                    {isSearch ?
                        <Spin indicator={antIcon} style={{ alignSelf: 'center', color: '#2F9264' }} />
                        :
                        data ?
                            <Card title={t('app.ME31')} headStyle={{ background: '#2F9264', color: 'white' }}>
                                <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', height: '70vh' }}>
                                    <Col span={12}>
                                        <Space direction='vertical'>
                                            <Select defaultValue={0} value={verified} onChange={(e) => { handleChange(e) }}>
                                                <Option value={0}>{t('app.ME27')}</Option>
                                                <Option value={1}>{t('app.ME26')}</Option>
                                            </Select>
                                            <Divider />
                                            <Input onChange={(e) => { setId(e.target.value) }} value={id} placeholder={t('app.ME17')} />
                                            <Input onChange={(e) => { setFullname(e.target.value) }} value={fullname} placeholder={t('app.ME18')} />
                                            <Input onChange={(e) => { setPhone(e.target.value) }} value={phone} placeholder={t('app.ME19')} />
                                            <Input onChange={(e) => { setAddress(e.target.value) }} value={address} placeholder={t('app.ME20')} />
                                        </Space>
                                    </Col>
                                </Row>
                                <Row>
                                    {isLoading ?
                                        <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                            <Spin indicator={antIcon} />
                                        </Col> :
                                        <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center' }}>
                                            <Button type="primary" onClick={update}>{t('app.ME22')}</Button>
                                            <Link to={'/dashboard/users'}>
                                                <Button style={{ marginLeft: 5, marginRight: 10 }}>{t('app.ME21')}</Button>
                                            </Link>
                                        </Col>}
                                </Row>
                            </Card>
                            :
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                </Col>
            </Row>
        </Layout>
    );
}

export default Update;