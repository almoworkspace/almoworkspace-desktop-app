import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Row, Col, Layout, Card, Input, Button, Select, notification, Spin, Space, Typography, DatePicker, TimePicker, Upload } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { CreateOrder, UploadFile, FindLast } from '../../../../helpers/apis/Order';
import { FindAll } from '../../../../helpers/apis/Tool';
import MessageHandler from '../../../component/MessageHandler';

const Create = () => {
    const token = useSelector(state => state.auth.token);
    const history = useHistory();
    const { t } = useTranslation();
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
    const [seriesNumber, setSeriesNumber] = useState('');
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
    const [generalPictures, setGeneralPictures] = useState([]);
    const [generalPicturesTwo, setGeneralPicturesTwo] = useState([]);
    const [generalPicturesThree, setGeneralPicturesThree] = useState([]);
    const [generalPicturesFour, setGeneralPicturesFour] = useState([]);
    const [typeTruckOne, setTypeTruckOne] = useState('');
    const [modelTruckOne, setModelTruckOne] = useState('');
    const [patentTruckOne, setPatentTruckOne] = useState('');
    const [typeTruckTwo, setTypeTruckTwo] = useState('');
    const [modelTruckTwo, setModelTruckTwo] = useState('');
    const [patentTruckTwo, setPatentTruckTwo] = useState('');
    const [typeTruckThree, setTypeTruckThree] = useState('');
    const [modelTruckThree, setModelTruckThree] = useState('');
    const [patentTruckThree, setPatentTruckThree] = useState('');
    const [typeTruckFour, setTypeTruckFour] = useState('');
    const [modelTruckFour, setModelTruckFour] = useState('');
    const [patentTruckFour, setPatentTruckFour] = useState('');
    const [clientSignatureName, setClientSignatureName] = useState('');
    const [techName, setTechName] = useState('');
    const [techDatetime, setTechDatetime] = useState('');
    const [techSignaturePicture, setTechSignaturePicture] = useState(null);
    const [clientAproveDatetime, setClientAproveDatetime] = useState('');
    const [clientSignaturePicture, setClientSignaturePicture] = useState(null);
    const [tools, setTools] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { TextArea } = Input;
    const { Title } = Typography;
    const { Option } = Select;

    useEffect(() => {
        (async () => {
            const response = await FindAll(token);
            if (response.statusCode === 200) {
                setTools(response.data);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await FindLast(token);
            if (response.statusCode === 200) {
                let tmpNro = response.data.otNumber;
                tmpNro = tmpNro + 1;
                setOtNumber(tmpNro.toString());
            } else {
                setOtNumber('1');
            }
        })();
    }, []);

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Mensaje del sistema',
            description:
                t("code.CO22"),
        });
    };

    const create = async () => {
        setIsLoading(true);
        let strPic = '';
        let strPicTwo = '';
        let strPicThree = '';
        let strPicFour = '';

        if (generalPictures.length > 0) {
            for (let index = 0; index <= generalPictures.length - 1; index++) {
                const result = await UploadFile(token, generalPictures[index]);
                if (result.statusCode === 200) {
                    if (index === (generalPictures.length - 1)) {
                        strPic = `${strPic}${result.data}`;
                    } else {
                        strPic = `${strPic}${result.data},`;
                    }
                }
            }
        }

        if (generalPicturesTwo.length > 0) {
            for (let index = 0; index <= generalPicturesTwo.length - 1; index++) {
                const result = await UploadFile(token, generalPicturesTwo[index]);
                if (result.statusCode === 200) {
                    if (index === (generalPicturesTwo.length - 1)) {
                        strPicTwo = `${strPicTwo}${result.data}`;
                    } else {
                        strPicTwo = `${strPicTwo}${result.data},`;
                    }
                }
            }
        }

        if (generalPicturesThree.length > 0) {
            for (let index = 0; index <= generalPicturesThree.length - 1; index++) {
                const result = await UploadFile(token, generalPicturesThree[index]);
                if (result.statusCode === 200) {
                    if (index === (generalPicturesThree.length - 1)) {
                        strPicThree = `${strPicThree}${result.data}`;
                    } else {
                        strPicThree = `${strPicThree}${result.data},`;
                    }
                }
            }
        }

        if (generalPicturesFour.length > 0) {
            for (let index = 0; index <= generalPicturesFour.length - 1; index++) {
                const result = await UploadFile(token, generalPicturesFour[index]);
                if (result.statusCode === 200) {
                    if (index === (generalPicturesFour.length - 1)) {
                        strPicFour = `${strPicFour}${result.data}`;
                    } else {
                        strPicFour = `${strPicFour}${result.data},`;
                    }
                }
            }
        }

        const obj = {
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
            seriesNumber: seriesNumber,
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
            generalPictures: strPic,
            generalPicturesTwo: strPicTwo,
            generalPicturesThree: strPicThree,
            generalPicturesFour: strPicFour,
            typeTruckOne: typeTruckOne,
            modelTruckOne: modelTruckOne,
            patentTruckOne: patentTruckOne,
            typeTruckTwo: typeTruckTwo,
            modelTruckTwo: modelTruckTwo,
            patentTruckTwo: patentTruckTwo,
            typeTruckThree: typeTruckThree,
            modelTruckThree: modelTruckThree,
            patentTruckThree: patentTruckThree,
            typeTruckFour: typeTruckFour,
            modelTruckFour: modelTruckFour,
            patentTruckFour: patentTruckFour,
            techName: techName,
            techDatetime: techDatetime,
            techSignaturePicture: techSignaturePicture === null ? '' : techSignaturePicture.path,
            clientSignatureName: clientSignatureName,
            clientAproveDatetime: clientAproveDatetime,
            clientSignaturePicture: clientSignaturePicture === null ? '' : clientSignaturePicture.path
        };
        const response = await CreateOrder(token, obj);
        if (response.statusCode === 200) {
            openNotificationWithIcon('success');
            setIsLoading(false);
            history.push('/dashboard/orders');
        } else {
            setIsLoading(false);
            MessageHandler(response.message);
        }
    }

    const uploadFile = async (file, type) => {
        let response;
        let tmpArray;
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
                tmpArray = generalPictures;
                tmpArray.push(file);
                setGeneralPictures(tmpArray);
                break;
            case 'obsTwo':
                tmpArray = generalPictures;
                tmpArray.push(file);
                setGeneralPicturesTwo(tmpArray);
                break;
            case 'obsThree':
                tmpArray = generalPictures;
                tmpArray.push(file);
                setGeneralPicturesThree(tmpArray);
                break;
            case 'obsFour':
                tmpArray = generalPictures;
                tmpArray.push(file);
                setGeneralPicturesFour(tmpArray);
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
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginBottom: 30 }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Title level={3}>CREADOR OT</Title>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setLastname(e.target.value) }} placeholder={t('app.ME36')} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setName(e.target.value) }} placeholder={t('app.ME37')} />
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', margin: 30 }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Title level={3}>INGRESO DE INFORMACI??N</Title>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input value={otNumber} placeholder={t('app.ME39')} />
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
                                    <Title level={3}>TAREAS A REALIZAR (Completar por ingeniero o t??cnico respectivo)</Title>
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
                                    <Input onChange={(e) => { setSeriesNumber(e.target.value) }} placeholder={t('app.ME88')} />
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
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder={t('app.ME47')}
                                        onChange={
                                            (value) => {
                                                if (tools.length < 1) {
                                                    setMaterialsTruckOne(value);
                                                } else {
                                                    let temp = `${materialsTruckOne},${value}`;
                                                    setMaterialsTruckOne(temp);
                                                }
                                            }
                                        }>
                                        {
                                            tools.length <= 0 ?
                                                <></>
                                                :
                                                tools.map((item, index) => {
                                                    return (
                                                        <Option key={index} value={item.descrip}>{item.descrip}</Option>
                                                    )
                                                })
                                        }
                                    </Select>
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder={t('app.ME48')}
                                        onChange={
                                            (value) => {
                                                if (tools.length < 1) {
                                                    setMaterialsTruckTwo(value);
                                                } else {
                                                    let temp = `${materialsTruckTwo},${value}`;
                                                    setMaterialsTruckTwo(temp);
                                                }
                                            }
                                        }>
                                        {
                                            tools.length <= 0 ?
                                                <></>
                                                :
                                                tools.map((item, index) => {
                                                    return (
                                                        <Option key={index} value={item.descrip}>{item.descrip}</Option>
                                                    )
                                                })
                                        }
                                    </Select>
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder={t('app.ME49')}
                                        onChange={
                                            (value) => {
                                                if (tools.length < 1) {
                                                    setMaterialsTruckThree(value);
                                                } else {
                                                    let temp = `${materialsTruckThree},${value}`;
                                                    setMaterialsTruckThree(temp);
                                                }
                                            }
                                        }>
                                        {
                                            tools.length <= 0 ?
                                                <></>
                                                :
                                                tools.map((item, index) => {
                                                    return (
                                                        <Option key={index} value={item.descrip}>{item.descrip}</Option>
                                                    )
                                                })
                                        }
                                    </Select>
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder={t('app.ME50')}
                                        onChange={
                                            (value) => {
                                                if (tools.length < 1) {
                                                    setMaterialsTruckFour(value);
                                                } else {
                                                    let temp = `${materialsTruckFour},${value}`;
                                                    setMaterialsTruckFour(temp);
                                                }
                                            }
                                        }>
                                        {
                                            tools.length <= 0 ?
                                                <></>
                                                :
                                                tools.map((item, index) => {
                                                    return (
                                                        <Option key={index} value={item.descrip}>{item.descrip}</Option>
                                                    )
                                                })
                                        }
                                    </Select>
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
                                    <Title level={3}>REGISTRO FOTOGR??FICO VEH??CULOS / MAQUINARIAS / CAMI??N / OTRO</Title>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Upload multiple={false} showUploadList={true} accept="image/*" action={(file) => { uploadFile(file, 'obs') }}>
                                        <Button icon={<UploadOutlined />}>Registro fotogr??fico veh??culo Nro 1</Button>
                                    </Upload>
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Upload multiple={false} showUploadList={true} accept="image/*" action={(file) => { uploadFile(file, 'obsTwo') }}>
                                        <Button icon={<UploadOutlined />}>Registro fotogr??fico veh??culo Nro 2</Button>
                                    </Upload>
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Upload multiple={false} showUploadList={true} accept="image/*" action={(file) => { uploadFile(file, 'obsThree') }}>
                                        <Button icon={<UploadOutlined />}>Registro fotogr??fico veh??culo Nro 3</Button>
                                    </Upload>
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Upload multiple={false} showUploadList={true} accept="image/*" action={(file) => { uploadFile(file, 'obsFour') }}>
                                        <Button icon={<UploadOutlined />}>Registro fotogr??fico veh??culo Nro 4</Button>
                                    </Upload>
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <TextArea rows={3} onChange={(e) => { setGeneralObs(e.target.value) }} placeholder={t('app.ME52')} />
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', margin: 30 }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Title level={3}>INFORMACI??N DE VEH??CULOS INSTALADOS</Title>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setTypeTruckOne(e.target.value) }} placeholder={`${t('app.ME89')} 1`} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setModelTruckOne(e.target.value) }} placeholder={`${t('app.ME90')} 1`} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setPatentTruckOne(e.target.value) }} placeholder={`${t('app.ME91')} 1`} />
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setTypeTruckTwo(e.target.value) }} placeholder={`${t('app.ME89')} 2`} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setModelTruckTwo(e.target.value) }} placeholder={`${t('app.ME90')} 2`} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setPatentTruckTwo(e.target.value) }} placeholder={`${t('app.ME91')} 2`} />
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setTypeTruckThree(e.target.value) }} placeholder={`${t('app.ME89')} 3`} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setModelTruckThree(e.target.value) }} placeholder={`${t('app.ME90')} 3`} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setPatentTruckThree(e.target.value) }} placeholder={`${t('app.ME91')} 3`} />
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                            <Col span={24}>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setTypeTruckFour(e.target.value) }} placeholder={`${t('app.ME89')} 4`} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setModelTruckFour(e.target.value) }} placeholder={`${t('app.ME90')} 4`} />
                                </Space>
                                <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                    <Input onChange={(e) => { setPatentTruckFour(e.target.value) }} placeholder={`${t('app.ME91')} 4`} />
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', margin: 30 }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Title level={3}>APROBADO T??CNICO</Title>
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
                                    <Input onChange={(e) => { setClientSignatureName(e.target.value) }} placeholder={t('app.ME41')} />
                                </Space>
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