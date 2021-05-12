import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Row, Col, Layout, Card, Input, Button, Modal, notification, Spin, Space, Select, Typography, DatePicker, Upload } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { CreateEntry } from '../../../../helpers/apis/Entry';
import { FindAll } from '../../../../helpers/apis/Form';
import { UploadFile } from '../../../../helpers/apis/Order';
import MessageHandler from '../../../component/MessageHandler';

const Create = () => {
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    const history = useHistory();
    const { t } = useTranslation();
    const [values, setValues] = useState([]);
    const [fields, setFields] = useState([]);
    const [data, setData] = useState([]);
    const [form, setForm] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { Title } = Typography;
    const { Option } = Select;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        const request = async () => {
            const response = await FindAll(token);
            console.log(response);
            if (response.statusCode === 200) {
                setData(response.data);
                setForm(response.data[0]);
                setFields(response.data[0].fields);
                setFormValues(response.data[0].fields);
            } else {
                setData([]);
            }
        };
        request();
    }, []);

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Mensaje del sistema',
            description:
                t("code.CO43"),
        });
    };

    const create = async () => {
        if (fields.length <= 0 || values.length <= 0 || form === null) {
            Modal.info({
                title: 'Mensaje del sistema',
                content: t('code.CO01')
            });
        } else {
            const obj = {
                form: form.id,
                user: user.id,
                data: values
            };
            setIsLoading(true);
            const response = await CreateEntry(token, obj);
            if (response.statusCode === 200) {
                openNotificationWithIcon('success');
                history.push('/dashboard/entrys');
            } else {
                setIsLoading(false);
                MessageHandler(response.message);
            }
        }
    }

    const changeForm = (e) => {
        const found = data.find(item => item.descrip === e);
        setForm(found);
        setFields(found.fields);
        setFormValues(found.fields);
    }

    const setFormValues = (form) => {
        let tmpForm = [];
        form.forEach(element => {
            let item = {
                descrip: element.descrip,
                type: element.type,
                value: ''
            };
            tmpForm.push(item);
        });
        setValues(tmpForm);
    }

    const setFormValue = (descrip, value) => {
        let tmpForm = values;
        tmpForm.forEach(element => {
            if (element.descrip === descrip) {
                element.value = value;
            }
        });
        setValues(tmpForm);
    }

    const uploadFile = async (file, descrip) => {
        const response = await UploadFile(token, file);
        if (response.statusCode === 200) {
            setFormValue(descrip, response.data);
        }
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
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/entrys/create'}>{t('app.ME24')}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24}>
                    <Card title={t('app.ME68')} headStyle={{ background: '#2F9264', color: 'white' }}>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', margin: 30 }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Title level={3}>{t('app.ME87')}</Title>
                                </Space>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Select onChange={(e) => { changeForm(e) }} defaultValue={data.length > 0 && data[0].descrip} style={{ width: '100%' }}>
                                        {
                                            data.length > 0 &&
                                            data.map((item, index) => {
                                                return (
                                                    <Option key={index} value={item.descrip}>{item.descrip}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Space>
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
                            {
                                fields.length > 0 &&
                                <Col span={24}>
                                    {
                                        fields.map((item, index) => {
                                            switch (item.type) {
                                                case "TEXTO":
                                                    return (
                                                        <Space key={index} direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                                            <Input onChange={(e) => { setFormValue(item.descrip, e.target.value) }} placeholder={item.descrip} />
                                                        </Space>
                                                    );
                                                case "FECHA":
                                                    return (
                                                        <Space key={index} direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                                            <DatePicker placeholder={item.descrip} format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} onChange={(e) => { setFormValue(item.descrip, e.format("YYYY-MM-DD HH:mm:ss").toString()) }} />
                                                        </Space>
                                                    );
                                                case "IMAGEN":
                                                    return (
                                                        <Space key={index} direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                                            <Upload multiple={false} showUploadList={false} accept="image/*" action={(file) => { uploadFile(file, item.descrip) }}>
                                                                <Button icon={<UploadOutlined />}>Imagen</Button>
                                                            </Upload>
                                                        </Space>
                                                    );
                                                case "FIRMA":
                                                    return (
                                                        <Space key={index} direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                                            <Upload multiple={false} showUploadList={false} accept="image/*" action={(file) => { uploadFile(file, item.descrip) }}>
                                                                <Button icon={<UploadOutlined />}>Firma</Button>
                                                            </Upload>
                                                        </Space>
                                                    );
                                                default:
                                                    return (
                                                        <Space key={index} direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                                            <Input onChange={(e) => { setFormValue(item.descrip, e.target.value) }} placeholder={item.descrip} />
                                                        </Space>
                                                    );
                                            }
                                        })
                                    }
                                </Col>
                            }
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                            {isLoading ?
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                    <Spin indicator={antIcon} />
                                </Col> :
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center' }}>
                                    <Button type="primary" onClick={create}>{t('app.ME22')}</Button>
                                    <Link to={'/dashboard/entrys'}>
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