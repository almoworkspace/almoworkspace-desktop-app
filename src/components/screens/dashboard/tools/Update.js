import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Row, Col, Layout, Card, Input, Button, Modal, notification, Spin, Divider, Space, Empty, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FindOne, Update as UpdateTool } from '../../../../helpers/apis/Tool';
import MessageHandler from '../../../component/MessageHandler';

const Update = ({ search }) => {
    const history = useHistory();
    const token = useSelector(state => state.auth.token);
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [descrip, setDescrip] = useState('');
    const [isSearch, setIsSearch] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        const request = async () => {
            const response = await FindOne(token, search);
            if (response.statusCode === 200) {
                setData(response.data);
                setDescrip(response.data.descrip);
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
                t("code.CO41"),
        });
    };

    const update = async () => {
        if (descrip === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: t('code.CO01')
            });
        } else {
            const obj = {
                descrip: descrip
            };
            setIsLoading(true);
            const response = await UpdateTool(token, obj, search);
            if (response.statusCode === 200) {
                openNotificationWithIcon('success');
                history.push('/dashboard/tools');
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
                            <Link to={'/dashboard/tools'}>{t('app.ME64')}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={`/dashboard/tools/${search}`}>{t('app.ME28')}</Link>
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
                            <Card title={t('app.ME67')} headStyle={{ background: '#2F9264', color: 'white' }}>
                                <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', height: '20vh' }}>
                                    <Col span={12}>
                                        <Space direction='vertical'>
                                            <Input onChange={(e) => { setDescrip(e.target.value) }} value={descrip} placeholder={t('app.ME22')} />
                                        </Space>
                                    </Col>
                                </Row>
                                <Row>
                                    {isLoading ?
                                        <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                            <Spin indicator={antIcon} />
                                        </Col>
                                        :
                                        <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center' }}>
                                            <Button type="primary" onClick={update}>{t('app.ME22')}</Button>
                                            <Link to={'/dashboard/tools'}>
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