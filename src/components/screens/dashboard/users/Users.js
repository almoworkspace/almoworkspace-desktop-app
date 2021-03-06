import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Layout, Row, Col, Button, Table, Tag, Space, Spin, Input, Modal } from 'antd';
import { PlusCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { FindAll, Delete } from '../../../../helpers/apis/User';

const Users = () => {
    const token = useSelector(state => state.auth.token);
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [staticData, setStaticData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [tmpId, setTmpId] = useState(null);
    const { Column } = Table;
    const { Search } = Input;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        const request = async () => {
            const response = await FindAll(token);
            setData(response.data);
            setStaticData(response.data);
        };
        request();
    }, []);

    const filterByText = (value) => {
        if (value === '') {
            setData(staticData);
        } else {
            let tmp = staticData.filter((item) => item.username.includes(value) || item.Profile[0].fullname.includes(value) || item.Profile[0].phone.includes(value) || item.Profile[0].address.includes(value));
            setData(tmp);
        }
    }

    const deleteUser = async (id) => {
        setData(null);
        setStaticData(null);
        setModalVisible(false);
        const response = await Delete(token, id);
        if (response.statusCode === 200) {
            const responseData = await FindAll(token);
            setData(responseData.data);
            setStaticData(responseData.data);
        }
    }

    return (
        <Layout style={{ background: 'white' }}>
            <Modal
                title="Mensaje del sistema"
                visible={modalVisible}
                onOk={() => { deleteUser(tmpId) }}
                onCancel={() => { setModalVisible(false) }}
                okText={t('app.ME83')}
                cancelText={t('app.ME84')}>
                <p>{t('app.ME85')}</p>
            </Modal>
            <Row style={{ margin: 20 }}>
                <Col span={8}>
                    <Breadcrumb>
                        <Breadcrumb.Item>{t('app.ME23')}</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/users'}>{t('app.ME05')}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col span={8} offset={8} style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Link to={'/dashboard/users/create'}>
                        <Button type="primary" icon={<PlusCircleOutlined />} size='middle'>
                            {t('app.ME24')}
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row style={{ marginVertical: 20 }}>
                <Col span={5}>
                    <Search
                        placeholder={t('app.ME29')}
                        allowClear
                        style={{ width: 200, marginLeft: 20 }}
                        onChange={(e) => { filterByText(e.target.value) }}
                    />
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                {data === null ?
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <Spin indicator={antIcon} size='large' />
                    </Col> :
                    <Col span={24}>
                        <Table dataSource={data}>
                            <Column title="ID" dataIndex="id" key="id" />
                            <Column title={t('app.ME01')} dataIndex="username" key="username" />
                            <Column title={t('app.ME25')} dataIndex="verified" key="verified" render={status => {
                                if (status === 1) {
                                    return (
                                        <Tag color="green">
                                            {t('app.ME26')}
                                        </Tag>
                                    );
                                } else {
                                    return (
                                        <Tag color="red">
                                            {t('app.ME27')}
                                        </Tag>
                                    );
                                }
                            }}
                            />
                            <Column
                                title="Acci??n"
                                key="action"
                                render={(text, record) => (
                                    <>
                                        <Space size="small">
                                            <Link to={`/dashboard/users/${record.id}`}>{t('app.ME28')}</Link>
                                        </Space>
                                        <Space size="small" style={{ marginLeft: 10 }}>
                                            <Button onClick={() => {
                                                setTmpId(record.id);
                                                setModalVisible(true);
                                            }} type="text" style={{ color: 'red' }}>{t('app.ME77')}</Button>
                                        </Space>
                                    </>
                                )}
                            />
                        </Table>
                    </Col>}
            </Row>
        </Layout>
    );
}

export default Users;