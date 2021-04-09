import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Row, Col, Layout, Card, Input, Button, Modal, notification, Spin, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { CreateTool } from '../../../../helpers/apis/Tool';
import MessageHandler from '../../../component/MessageHandler';

const Create = () => {
    const token = useSelector(state => state.auth.token);
    const history = useHistory();
    const { t } = useTranslation();
    const [descrip, setDescrip] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Mensaje del sistema',
            description:
                t("code.CO38"),
        });
    };

    const create = async () => {
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
            const response = await CreateTool(token, obj);
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
                            <Link to={'/dashboard/tools/create'}>{t('app.ME24')}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24}>
                    <Card title={t('app.ME66')} headStyle={{ background: '#2F9264', color: 'white' }}>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', height: '20vh' }}>
                            <Col span={12}>
                                <Space direction='vertical'>
                                    <Input onChange={(e) => { setDescrip(e.target.value) }} style={{ marginTop: 20 }} placeholder={t('app.ME65')} />
                                </Space>
                            </Col>
                        </Row>
                        <Row>
                            {isLoading ?
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                    <Spin indicator={antIcon} />
                                </Col> :
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center' }}>
                                    <Button type="primary" onClick={create}>{t('app.ME22')}</Button>
                                    <Link to={'/dashboard/tools'}>
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