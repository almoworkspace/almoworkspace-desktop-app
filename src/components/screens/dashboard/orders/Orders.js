import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Layout, Row, Col, Button, Table, Space, Spin, Input, notification } from 'antd';
import { PlusCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { FindAll, FindOne, ExportOrderToPDF, DownloadFile } from '../../../../helpers/apis/Order';

const Orders = () => {
    const token = useSelector(state => state.auth.token);
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [staticData, setStaticData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Mensaje del sistema',
            description:
                t("app.ME59"),
        });
    };

    const exportPdf = async (id) => {
        const response = await FindOne(token, id);
        if (response.statusCode === 200) {
            setIsLoading(true);
            const result = await ExportOrderToPDF(token, response.data);
            if (result.statusCode === 200) {
                openNotificationWithIcon('success');
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        }
    }

    const downloadPdf = async (code) => {
        setIsLoading(true);
        const response = await DownloadFile(token, code);
        setIsLoading(false);
    }

    const filterByText = (value) => {
        if (value === '') {
            setData(staticData);
        } else {
            let tmp = staticData.filter((item) => item.code.includes(value));
            setData(tmp);
        }
    }

    return (
        <Layout style={{ background: 'white' }}>
            <Row style={{ margin: 20 }}>
                <Col span={8}>
                    <Breadcrumb>
                        <Breadcrumb.Item>{t('app.ME23')}</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/orders'}>{t('app.ME08')}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col span={8} offset={8} style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Link to={'/dashboard/orders/create'}>
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
                {data === null || isLoading === true ?
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <Spin indicator={antIcon} size='large' />
                    </Col> :
                    <Col span={24}>
                        <Table dataSource={data}>
                            <Column title={t('app.ME39')} dataIndex="otNumber" key="otNumber" />
                            <Column
                                title="Acción"
                                key="action"
                                render={(text, record) => (
                                    <>
                                        <Space size="small">
                                            <Link to={`/dashboard/orders/${record.id}`}>
                                                <Button type="text" style={{ color: '#2F9264' }}>{t('app.ME28')}</Button>
                                            </Link>
                                        </Space>
                                        <Space size="small" style={{ marginLeft: 10 }}>
                                            <Button onClick={() => { exportPdf(record.id) }} type="text" style={{ color: '#2F9264' }}>{t('app.ME58')}</Button>
                                        </Space>
                                        <Space size="small">
                                            <Button onClick={() => { downloadPdf(record.otNumber) }} type="text" style={{ color: '#2F9264' }}>{t('app.ME60')}</Button>
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

export default Orders;