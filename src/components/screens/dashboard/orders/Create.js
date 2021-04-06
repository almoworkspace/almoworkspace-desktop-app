import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Row, Col, Layout, Card, Input, Button, Modal, notification, Spin, Space, Typography, DatePicker, TimePicker, Upload } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { CreateOrder, UploadFile } from '../../../../helpers/apis/Order';
import MessageHandler from '../../../component/MessageHandler';

const Create = () => {
    const token = useSelector(state => state.auth.token);
    const history = useHistory();
    const { t } = useTranslation();
    const [code, setCode] = useState('');
    const [version, setVersion] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [answerDate, setAnswerDate] = useState('');
    const [otNumber, setOtNumber] = useState('');
    const [quotationNumber, setQuotationNumber] = useState('');
    const [clientName, setClientName] = useState('');
    const [setupDatetime, setSetupDatetime] = useState('');
    const [setupAddress, setSetupAddress] = useState('');
    const [email, setEmail] = useState('');
    const [hasWorks, setHasWorks] = useState('');
    const [taskObsOne, setTaskObsOne] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [truckDeliverTime, setTruckDeliverTime] = useState('');
    const [taskObsTwo, setTaskObsTwo] = useState('');
    const [materialsTruckOne, setMaterialsTruckOne] = useState('');
    const [materialsTruckTwo, setMaterialsTruckTwo] = useState('');
    const [materialsTruckThree, setMaterialsTruckThree] = useState('');
    const [materialsTruckFour, setMaterialsTruckFour] = useState('');
    const [materialsConclusions, setMaterialsConclusion] = useState('');
    const [materialsObs, setMaterialsObs] = useState('');
    const [generalObs, setGeneralObs] = useState('');
    const [generalPictures, setGeneralPictures] = useState('');
    const [techName, setTechName] = useState('');
    const [techDatetime, setTechDatetime] = useState('');
    const [techSignaturePicture, setTechSignaturePicture] = useState(null);
    const [clientAproveDatetime, setClientAproveDatetime] = useState('');
    const [clientSignaturePicture, setClientSignaturePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { TextArea } = Input;
    const { Title, Text } = Typography;

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Mensaje del sistema',
            description:
                t("code.CO22"),
        });
    };

    const create = async () => {
        if (version === '' || code === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: t('code.CO01')
            });
        } else {            
            const obj = {
                code: code,
                version: version,
                name: name,
                lastname: lastname,
                answerDate: answerDate,
                otNumber: otNumber,
                quotationNumber: quotationNumber,
                clientName: clientName,
                setupDatetime: setupDatetime,
                setupAddress: setupAddress,
                email: email,
                hasWorks: hasWorks,
                taskObsOne: taskObsOne,
                startTime: startTime,
                endTime: endTime,
                truckDeliverTime: truckDeliverTime,
                taskObsTwo: taskObsTwo,
                materialsTruckOne: materialsTruckOne,
                materialsTruckTwo: materialsTruckTwo,
                materialsTruckThree: materialsTruckThree,
                materialsTruckFour: materialsTruckFour,
                materialsConclusions: materialsConclusions,
                materialsObs: materialsObs,
                generalObs: generalObs,
                generalPictures: generalPictures === null ? '' : generalPictures,
                techName: techName,
                techDatetime: techDatetime,
                techSignaturePicture: techSignaturePicture === null ? '' : techSignaturePicture.path,
                clientAproveDatetime: clientAproveDatetime,
                clientSignaturePicture: clientSignaturePicture === null ? '' : clientSignaturePicture.path
            };
            setIsLoading(true);
            const response = await CreateOrder(token, obj);
            if (response.statusCode === 200) {
                openNotificationWithIcon('success');
                history.push('/dashboard/orders');
            } else {
                setIsLoading(false);
                MessageHandler(response.message);
            }
        }
    }

    const uploadFile = async (file, type) => {
        let response;
        switch (type) {
            case 'tech':
                response = await UploadFile(token, file);
                if (response.statusCode === 200) {
                    setTechSignaturePicture({
                        file: file,
                        path: response.data
                    });
                }
                break;
            case 'client':
                response = await UploadFile(token, file);
                if (response.statusCode === 200) {
                    setClientSignaturePicture({
                        file: file,
                        path: response.data
                    });
                }
                break;
            case 'obs':
                response = await UploadFile(token, file);
                if (response.statusCode === 200) {
                    if (generalPictures === '') {
                        let temp = generalPictures;
                        temp = `${temp}${response.data}`;
                        setGeneralPictures(temp);
                    } else {
                        let temp = generalPictures;
                        temp = `${temp},${response.data}`;
                        setGeneralPictures(temp);
                    }
                }
                break;
            default:
                response = await UploadFile(token, file);
                if (response.statusCode === 200) {
                    setTechSignaturePicture({
                        file: file,
                        path: response.data
                    });
                }
                break;
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
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/orders/create'}>{t('app.ME24')}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24}>
                    <Card title={t('app.ME32')} headStyle={{ background: '#2F9264', color: 'white' }}>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setCode(e.target.value) }} placeholder={t('app.ME34')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setVersion(e.target.value) }} placeholder={t('app.ME35')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setLastname(e.target.value) }} placeholder={t('app.ME36')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setName(e.target.value) }} placeholder={t('app.ME37')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <DatePicker placeholder={t('app.ME38')} format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} onChange={(e) => { setAnswerDate(e.format("YYYY-MM-DD HH:mm:ss").toString()) }} />
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', margin: 30 }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Title level={3}>INGRESO DE INFORMACIÓN</Title>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setOtNumber(e.target.value) }} placeholder={t('app.ME39')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setQuotationNumber(e.target.value) }} placeholder={t('app.ME40')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setClientName(e.target.value) }} placeholder={t('app.ME41')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <DatePicker placeholder={t('app.ME42')} format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} onChange={(e) => { setSetupDatetime(e.format("YYYY-MM-DD HH:mm:ss").toString()) }} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <TextArea rows={3} onChange={(e) => { setSetupAddress(e.target.value) }} placeholder={t('app.ME43')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setEmail(e.target.value) }} placeholder={t('app.ME44')} />
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', margin: 30 }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Title level={3}>TAREAS</Title>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setHasWorks(e.target.value) }} placeholder={t('app.ME45')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <TextArea rows={3} onChange={(e) => { setTaskObsOne(e.target.value) }} placeholder={t('app.ME46')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <TimePicker placeholder={t('app.ME55')} onChange={(e) => { setStartTime(e.format("HH:mm:ss").toString()) }} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <TimePicker placeholder={t('app.ME56')} onChange={(e) => { setEndTime(e.format("HH:mm:ss").toString()) }} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <TimePicker placeholder={t('app.ME57')} onChange={(e) => { setTruckDeliverTime(e.format("HH:mm:ss").toString()) }} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <TextArea rows={3} onChange={(e) => { setTaskObsTwo(e.target.value) }} placeholder={t('app.ME52')} />
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', margin: 30 }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Title level={3}>MATERIALES USADOS EN GENERAL</Title>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setMaterialsTruckOne(e.target.value) }} placeholder={t('app.ME47')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setMaterialsTruckTwo(e.target.value) }} placeholder={t('app.ME48')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setMaterialsTruckThree(e.target.value) }} placeholder={t('app.ME49')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setMaterialsTruckFour(e.target.value) }} placeholder={t('app.ME50')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <TextArea rows={3} onChange={(e) => { setMaterialsConclusion(e.target.value) }} placeholder={t('app.ME51')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <TextArea rows={3} onChange={(e) => { setMaterialsObs(e.target.value) }} placeholder={t('app.ME52')} />
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', margin: 30 }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Title level={3}>OBSERVACIONES GENERALES / RECOMENDACIONES</Title>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <TextArea rows={3} onChange={(e) => { setGeneralObs(e.target.value) }} placeholder={t('app.ME52')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Upload multiple={false} showUploadList={true} accept="image/*" action={(file) => { uploadFile(file, 'obs') }}>
                                        <Button icon={<UploadOutlined />}>Fotos vehículos</Button>
                                    </Upload>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', margin: 30 }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Title level={3}>APROBADO TÉCNICO</Title>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setTechName(e.target.value) }} placeholder={t('app.ME53')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <DatePicker placeholder={t('app.ME54')} format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} onChange={(e) => { setTechDatetime(e.format("YYYY-MM-DD HH:mm:ss").toString()) }} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Upload multiple={false} showUploadList={false} accept="image/*" action={(file) => { uploadFile(file, 'tech') }}>
                                        <Button icon={<UploadOutlined />}>Firma</Button>
                                    </Upload>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', margin: 30 }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Title level={3}>APROBADO CLIENTE (conformidad del servicio)</Title>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <DatePicker placeholder={t('app.ME54')} format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} onChange={(e) => { setClientAproveDatetime(e.format("YYYY-MM-DD HH:mm:ss").toString()) }} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Upload multiple={false} showUploadList={false} accept="image/*" action={(file) => { uploadFile(file, 'client') }}>
                                        <Button icon={<UploadOutlined />}>Firma</Button>
                                    </Upload>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                            {isLoading ?
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                    <Spin indicator={antIcon} />
                                </Col> :
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center' }}>
                                    <Button type="primary" onClick={create}>{t('app.ME22')}</Button>
                                    <Link to={'/dashboard/orders'}>
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