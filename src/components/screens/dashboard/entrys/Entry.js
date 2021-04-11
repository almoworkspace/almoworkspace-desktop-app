import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Layout, Row, Col, Button, Table, Space, Spin, Input, notification } from 'antd';
import { PlusCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { FindAll, FindAllMe, FindOne, ExportOrderToPDF } from '../../../../helpers/apis/Entry';
import { DownloadFile } from '../../../../helpers/apis/Order';

const Forms = () => {
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
            if (response.statusCode === 200) {
                if (response.data.length <= 0) {
                    setData([]);
                    setStaticData([]);
                } else {
                    setData(response.data);
                    setStaticData(response.data);
                }
            } else {
                setData([]);
                setStaticData([]);
            }
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

    const filterByText = (value) => {
        if (value === '') {
            setData(staticData);
        } else {
            let tmp = staticData.filter((item) => item.descrip.includes(value));
            setData(tmp);
        }
    }

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
        await DownloadFile(token, code);
    }

    return (
        <Layout style={{ background: 'white' }}>
            <Row style={{ margin: 20 }}>
                <Col span={8}>
                    <Breadcrumb>
                        <Breadcrumb.Item>{t('app.ME23')}</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/entrys'}>{t('app.ME06')}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col span={8} offset={8} style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Link to={'/dashboard/entrys/create'}>
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
                            <Column
                                title={t('app.ME65')}
                                key={t('app.ME65')}
                                render={(text, record) => (
                                    record.Form.descrip
                                )}
                            />
                            <Column
                                title={t('app.ME01')}
                                key={t('app.ME01')}
                                render={(text, record) => (
                                    record.User.username
                                )}
                            />
                            <Column
                                title="Acción"
                                key="action"
                                render={(text, record) => (
                                    <>
                                        <Space size="small" style={{ marginLeft: 10 }}>
                                            <Button onClick={() => { exportPdf(record.id) }} type="text" style={{ color: '#2F9264' }}>{t('app.ME58')}</Button>
                                        </Space>
                                        <Space size="small">
                                            <Button onClick={() => { downloadPdf(record.id) }} type="text" style={{ color: '#2F9264' }}>{t('app.ME60')}</Button>
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

export default Forms;