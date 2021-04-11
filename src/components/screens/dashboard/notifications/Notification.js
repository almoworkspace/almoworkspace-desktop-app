import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Breadcrumb, Layout, Row, Col, Button, Table, Space, Spin, Input, notification, Card, Typography, Modal } from 'antd';
import { PlusCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { SocketContext } from '../../../../context/Socket';
import { FindAll, Update } from '../../../../helpers/apis/Notification';

const Notification = () => {
    const { t } = useTranslation();
    const token = useSelector(state => state.auth.token);
    const history = useHistory();
    const socket = useContext(SocketContext);
    const [notifications, setNotifications] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { Text } = Typography;

    useEffect(() => {
        searchNotifications();
    }, []);

    useEffect(() => {
        socket.on("order_created", async data => {
            const response = await FindAll(token);
            if (response.statusCode === 200) {
                setNotifications(response.data.length);
            }
        });
    }, []);

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Mensaje del sistema',
            description:
                t("code.CO30"),
        });
    };

    const searchNotifications = async () => {
        const response = await FindAll(token);
        if (response.statusCode === 200) {
            setNotifications(response.data);
        } else {
            setNotifications([]);
        }
    }

    const update = async (id) => {
        setIsLoading(true);
        const response = await Update(token, id);
        if (response.statusCode === 200) {
            setIsLoading(false);
            openNotificationWithIcon('success');
            await searchNotifications();
        } else {
            setIsLoading(false);
            Modal.info({
                title: 'Mensaje del sistema',
                content: t('code.CO31')
            });
        }
    }

    return (
        <Layout style={{ background: 'white' }}>
            <Row style={{ margin: 20 }}>
                <Col span={8}>
                    <Breadcrumb>
                        <Breadcrumb.Item>{t('app.ME23')}</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/notifications'}>{t('app.ME12')}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                {
                    notifications === null || isLoading === true ?
                        <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                            <Spin indicator={antIcon} size='large' />
                        </Col> :
                        <Col span={24} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                            {notifications.map((item, index) => {
                                const { id, title, descrip, createdAt } = item;
                                return (
                                    <Card key={index} title={title} style={{ margin: 10 }} extra={
                                        <Button type="primary" size='middle' onClick={() => { update(id) }}>
                                            {t('app.ME61')}
                                        </Button>}>
                                        <Text>{descrip}</Text>
                                        <br />
                                        <Text>{moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}</Text>
                                    </Card>
                                )
                            })}
                        </Col>
                }
            </Row>
        </Layout>
    );
}

export default Notification;