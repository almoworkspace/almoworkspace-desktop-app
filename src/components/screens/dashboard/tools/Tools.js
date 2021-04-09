import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Layout, Row, Col, Button, Table, Tag, Space, Spin, Input } from 'antd';
import { PlusCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { FindAll } from '../../../../helpers/apis/Tool';

const Tools = () => {
    const token = useSelector(state => state.auth.token);
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [staticData, setStaticData] = useState(null);
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
            let tmp = staticData.filter((item) => item.descrip.includes(value));
            setData(tmp);
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
                    </Breadcrumb>
                </Col>
                <Col span={8} offset={8} style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Link to={'/dashboard/tools/create'}>
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
                            <Column title={t('app.ME65')} dataIndex="descrip" key="descrip" />                            
                            <Column
                                title="Acción"
                                key="action"
                                render={(text, record) => (
                                    <Space size="small">
                                        <Link to={`/dashboard/tools/${record.id}`}>{t('app.ME28')}</Link>
                                    </Space>
                                )}
                            />
                        </Table>
                    </Col>}
            </Row>
        </Layout>
    );
}

export default Tools;