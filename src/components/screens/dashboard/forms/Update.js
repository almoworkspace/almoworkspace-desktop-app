import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Row, Col, Layout, Card, Input, Button, Modal, notification, Spin, Space, Select, Typography, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Update as UpdateForm, FindOne } from '../../../../helpers/apis/Form';
import MessageHandler from '../../../component/MessageHandler';

const Update = ({ search }) => {
    const token = useSelector(state => state.auth.token);
    const history = useHistory();
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [descrip, setDescrip] = useState('');
    const [fields, setFields] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('TEXTO');
    const [isLoading, setIsLoading] = useState(false);
    const { Title, Text } = Typography;
    const { Option } = Select;
    const { Column } = Table;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        (async () => {
            const response = await FindOne(token, search);
            if (response.statusCode === 200) {                
                setDescrip(response.data.descrip);
                setFields(JSON.parse(response.data.fields));
            }
        })();
    }, []);

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Mensaje del sistema',
            description:
                t("code.CO44"),
        });
    };

    const update = async () => {
        if (descrip === '' || fields.length <= 0) {
            Modal.info({
                title: 'Mensaje del sistema',
                content: t('code.CO01')
            });
        } else {
            const obj = {
                descrip: descrip,
                fields: fields
            };
            setIsLoading(true);
            const response = await UpdateForm(token, obj, search);
            if (response.statusCode === 200) {
                openNotificationWithIcon('success');
                history.push('/dashboard/forms');
            } else {
                setIsLoading(false);
                MessageHandler(response.message);
            }
        }
    }

    const removeField = (descrip) => {
        const found = fields.filter(item => item.descrip !== descrip);
        if (found) {
            setFields(found);
        } else {
            setFields([]);
        }
    }

    const addField = () => {
        if (type === '' || name === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: t('code.CO01')
            });
        } else {
            const found = fields.find(item => item.descrip === name);
            if (found) {
                Modal.info({
                    title: 'Mensaje del sistema',
                    content: t('app.ME79')
                });
            } else {
                let field = [...fields, {
                    descrip: name,
                    type: type
                }];
                setFields(field);
                setName('');
                setType('TEXTO');
            }
        }
    }

    return (
        <Layout style={{ background: 'white' }}>
            <Row style={{ margin: 20 }}>
                <Col span={8}>
                    <Breadcrumb>
                        <Breadcrumb.Item>{t('app.ME23')}</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/forms'}>{t('app.ME06')}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/forms/create'}>{t('app.ME24')}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24}>
                    <Card title={t('app.ME68')} headStyle={{ background: '#2F9264', color: 'white' }}>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setDescrip(e.target.value) }} value={descrip} placeholder={t('app.ME65')} />
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', margin: 30 }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Title level={3}>{t('app.ME74')}</Title>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setName(e.target.value) }} value={name} placeholder={t('app.ME70')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Select defaultValue="TEXTO" onChange={(e) => { setType(e) }}>
                                        <Option value="TEXTO">{t('app.ME71')}</Option>
                                        <Option value="FECHA">{t('app.ME72')}</Option>
                                        <Option value="IMAGEN">{t('app.ME73')}</Option>
                                        <Option value="FIRMA">{t('app.ME86')}</Option>
                                    </Select>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                            <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center' }}>
                                <Button type="primary" onClick={addField}>{t('app.ME78')}</Button>
                            </Col>
                        </Row>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', margin: 30 }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Title level={3}>{t('app.ME75')}</Title>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Table dataSource={fields}>
                                    <Column title={t('app.ME70')} dataIndex="descrip" key="descrip" />
                                    <Column title={t('app.ME76')} dataIndex="type" key="type" />
                                    <Column
                                        title="Acción"
                                        key="action"
                                        render={(text, record) => (
                                            <Space size="small">
                                                <Button type="text" onClick={() => { removeField(record.descrip) }}><Text strong>{t("app.ME77")}</Text></Button>
                                            </Space>
                                        )}
                                    />
                                </Table>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                            {isLoading ?
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                    <Spin indicator={antIcon} />
                                </Col> :
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center' }}>
                                    <Button type="primary" onClick={update}>{t('app.ME22')}</Button>
                                    <Link to={'/dashboard/forms'}>
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

export default Update;