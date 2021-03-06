import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Row, Col, Layout, Card, Input, Button, Select, notification, Spin, Space, Typography, DatePicker, TimePicker, Upload } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { UpdateOrder, UploadFile, FindOne } from '../../../../helpers/apis/Order';
import { FindAll } from '../../../../helpers/apis/Tool';
import MessageHandler from '../../../component/MessageHandler';

const Update = ({ search }) => {
    const token = useSelector(state => state.auth.token);
    const history = useHistory();
    const { t } = useTranslation();
    const [data, setData] = useState(null);
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
    const [generalPictures, setGeneralPictures] = useState('');
    const [generalPicturesTwo, setGeneralPicturesTwo] = useState('');
    const [generalPicturesThree, setGeneralPicturesThree] = useState('');
    const [generalPicturesFour, setGeneralPicturesFour] = useState('');
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
            const response = await FindOne(token, search);
            if (response.statusCode === 200) {
                setName(response.data.name);
                setLastname(response.data.lastname);
                setAnswerDate(response.data.answerDate);
                setOtNumber(response.data.otNumber);
                setQuotationNumber(response.data.quotationNumber);
                setClientName(response.data.clientName);
                setSetupDatetime(response.data.setupDatetime);
                setSetupAddress(response.data.setupAddress);
                setEmail(response.data.email);
                setHasWorks(response.data.hasWorks);
                setSeriesNumber(response.data.seriesNumber);
                setTaskObsOne(response.data.taskObsOne);
                setStartTime(response.data.startTime);
                setEndTime(response.data.endTime);
                setTruckDeliverTime(response.data.truckDeliverTime);
                setTaskObsTwo(response.data.taskObsTwo);
                setMaterialsTruckOne(response.data.materialsTruckOne);
                setMaterialsTruckTwo(response.data.materialsTruckTwo);
                setMaterialsTruckThree(response.data.materialsTruckThree);
                setMaterialsTruckFour(response.data.materialsTruckFour);
                setMaterialsConclusion(response.data.materialsConclusions);
                setMaterialsObs(response.data.materialsObs);
                setGeneralObs(response.data.generalObs);
                setGeneralPictures(response.data.generalPictures);
                setGeneralPicturesTwo(response.data.generalPicturesTwo);
                setGeneralPicturesThree(response.data.generalPicturesThree);
                setGeneralPicturesFour(response.data.generalPicturesFour);
                setTypeTruckOne(response.data.typeTruckOne);
                setModelTruckOne(response.data.modelTruckOne);
                setPatentTruckOne(response.data.patentTruckOne);
                setTypeTruckTwo(response.data.typeTruckTwo);
                setModelTruckTwo(response.data.modelTruckTwo);
                setPatentTruckTwo(response.data.patentTruckTwo);
                setTypeTruckThree(response.data.typeTruckThree);
                setModelTruckThree(response.data.modelTruckThree);
                setPatentTruckThree(response.data.patentTruckThree);
                setTypeTruckFour(response.data.typeTruckFour);
                setModelTruckFour(response.data.modelTruckFour);
                setPatentTruckFour(response.data.patentTruckFour);
                setClientSignatureName(response.data.clientSignatureName);
                setTechName(response.data.techName);
                setTechDatetime(response.data.techDatetime);
                setClientAproveDatetime(response.data.clientAproveDatetime);
                setClientSignaturePicture(response.data.clientSignaturePicture);
                setData(response.data);
            }
        })();
    }, []);

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Mensaje del sistema',
            description:
                t("code.CO49"),
        });
    };

    const update = async () => {
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
            generalPictures: generalPictures === null ? '' : generalPictures,
            generalPicturesTwo: generalPicturesTwo === null ? '' : generalPicturesTwo,
            generalPicturesThree: generalPicturesThree === null ? '' : generalPicturesThree,
            generalPicturesFour: generalPicturesFour === null ? '' : generalPicturesFour,
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
        setIsLoading(true);
        const response = await UpdateOrder(token, search, obj);
        if (response.statusCode === 200) {
            openNotificationWithIcon('success');
            history.push('/dashboard/orders');
        } else {
            setIsLoading(false);
            MessageHandler(response.message);
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
            case 'obsTwo':
                response = await UploadFile(token, file);
                if (response.statusCode === 200) {
                    if (generalPicturesTwo === '') {
                        let temp = generalPicturesTwo;
                        temp = `${temp}${response.data}`;
                        setGeneralPicturesTwo(temp);
                    } else {
                        let temp = generalPicturesTwo;
                        temp = `${temp},${response.data}`;
                        setGeneralPicturesTwo(temp);
                    }
                }
                break;
            case 'obsThree':
                response = await UploadFile(token, file);
                if (response.statusCode === 200) {
                    if (generalPicturesThree === '') {
                        let temp = generalPicturesThree;
                        temp = `${temp}${response.data}`;
                        setGeneralPicturesThree(temp);
                    } else {
                        let temp = generalPicturesThree;
                        temp = `${temp},${response.data}`;
                        setGeneralPicturesThree(temp);
                    }
                }
                break;
            case 'obsFour':
                response = await UploadFile(token, file);
                if (response.statusCode === 200) {
                    if (generalPicturesFour === '') {
                        let temp = generalPicturesFour;
                        temp = `${temp}${response.data}`;
                        setGeneralPicturesFour(temp);
                    } else {
                        let temp = generalPicturesFour;
                        temp = `${temp},${response.data}`;
                        setGeneralPicturesFour(temp);
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

    const defaultValueTool = (values) => {
        let letArrayTmp = [];
        let letTempArray = values.split(',');

        letTempArray.length > 0 && letTempArray.forEach(element => {
            element !== '' && letArrayTmp.push(element);
        });
        return letArrayTmp;
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
                            <Link to={`/dashboard/orders/${search}`}>{t('app.ME28')}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24}>
                    {
                        data &&
                        <Card title={t('app.ME33')} headStyle={{ background: '#2F9264', color: 'white' }}>
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
                                        <Input onChange={(e) => { setLastname(e.target.value) }} value={lastname} placeholder={t('app.ME36')} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input onChange={(e) => { setName(e.target.value) }} value={name} placeholder={t('app.ME37')} />
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
                                        <Input value={otNumber} onChange={(e) => { setOtNumber(e.target.value) }} placeholder={t('app.ME39')} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={quotationNumber} onChange={(e) => { setQuotationNumber(e.target.value) }} placeholder={t('app.ME40')} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={clientName} onChange={(e) => { setClientName(e.target.value) }} placeholder={t('app.ME41')} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <DatePicker value={moment(setupDatetime)} placeholder={t('app.ME42')} format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} onChange={(e) => { e !== null && setSetupDatetime(e.format("YYYY-MM-DD HH:mm:ss").toString()) }} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <TextArea value={setupAddress} rows={3} onChange={(e) => { setSetupAddress(e.target.value) }} placeholder={t('app.ME43')} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder={t('app.ME44')} />
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
                                        <Input value={hasWorks} onChange={(e) => { setHasWorks(e.target.value) }} placeholder={t('app.ME45')} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <TextArea value={taskObsOne} rows={3} onChange={(e) => { setTaskObsOne(e.target.value) }} placeholder={t('app.ME46')} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={seriesNumber} onChange={(e) => { setSeriesNumber(e.target.value) }} placeholder={t('app.ME88')} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <TimePicker value={moment(startTime, 'HH:mm:ss')} placeholder={t('app.ME55')} onChange={(e) => { e !== null && setStartTime(e.format("HH:mm:ss").toString()) }} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <TimePicker value={moment(endTime, 'HH:mm:ss')} placeholder={t('app.ME56')} onChange={(e) => { e !== null && setEndTime(e.format("HH:mm:ss").toString()) }} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <TimePicker value={moment(truckDeliverTime, 'HH:mm:ss')} placeholder={t('app.ME57')} onChange={(e) => { e !== null && setTruckDeliverTime(e.format("HH:mm:ss").toString()) }} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <TextArea rows={3} value={taskObsTwo} onChange={(e) => { setTaskObsTwo(e.target.value) }} placeholder={t('app.ME52')} />
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
                                            defaultValue={defaultValueTool(materialsTruckOne)}
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
                                            defaultValue={defaultValueTool(materialsTruckTwo)}
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
                                            defaultValue={defaultValueTool(materialsTruckThree)}
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
                                            defaultValue={defaultValueTool(materialsTruckFour)}
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
                                        <TextArea rows={3} value={materialsConclusions} onChange={(e) => { setMaterialsConclusion(e.target.value) }} placeholder={t('app.ME51')} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <TextArea rows={3} value={materialsObs} onChange={(e) => { setMaterialsObs(e.target.value) }} placeholder={t('app.ME52')} />
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
                                        <TextArea rows={3} value={generalObs} onChange={(e) => { setGeneralObs(e.target.value) }} placeholder={t('app.ME52')} />
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
                                        <Input value={typeTruckOne} onChange={(e) => { setTypeTruckOne(e.target.value) }} placeholder={`${t('app.ME89')} 1`} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={modelTruckOne} onChange={(e) => { setModelTruckOne(e.target.value) }} placeholder={`${t('app.ME90')} 1`} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={patentTruckOne} onChange={(e) => { setPatentTruckOne(e.target.value) }} placeholder={`${t('app.ME91')} 1`} />
                                    </Space>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: 10 }}>
                                <Col span={24}>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={typeTruckTwo} onChange={(e) => { setTypeTruckTwo(e.target.value) }} placeholder={`${t('app.ME89')} 2`} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={modelTruckTwo} onChange={(e) => { setModelTruckTwo(e.target.value) }} placeholder={`${t('app.ME90')} 2`} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={patentTruckTwo} onChange={(e) => { setPatentTruckTwo(e.target.value) }} placeholder={`${t('app.ME91')} 2`} />
                                    </Space>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: 10 }}>
                                <Col span={24}>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={typeTruckThree} onChange={(e) => { setTypeTruckThree(e.target.value) }} placeholder={`${t('app.ME89')} 3`} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={modelTruckThree} onChange={(e) => { setModelTruckThree(e.target.value) }} placeholder={`${t('app.ME90')} 3`} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={patentTruckThree} onChange={(e) => { setPatentTruckThree(e.target.value) }} placeholder={`${t('app.ME91')} 3`} />
                                    </Space>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: 10 }}>
                                <Col span={24}>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={typeTruckFour} onChange={(e) => { setTypeTruckFour(e.target.value) }} placeholder={`${t('app.ME89')} 4`} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={modelTruckFour} onChange={(e) => { setModelTruckFour(e.target.value) }} placeholder={`${t('app.ME90')} 4`} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <Input value={patentTruckTwo} onChange={(e) => { setPatentTruckFour(e.target.value) }} placeholder={`${t('app.ME91')} 4`} />
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
                                        <Input value={techName} onChange={(e) => { setTechName(e.target.value) }} placeholder={t('app.ME53')} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <DatePicker value={moment(techDatetime)} placeholder={t('app.ME54')} format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} onChange={(e) => { e !== null && setTechDatetime(e.format("YYYY-MM-DD HH:mm:ss").toString()) }} />
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
                                        <Input value={clientSignatureName} onChange={(e) => { setClientSignatureName(e.target.value) }} placeholder={t('app.ME41')} />
                                    </Space>
                                    <Space direction='vertical' style={{ width: '100%', marginBottom: 10 }}>
                                        <DatePicker value={moment(clientAproveDatetime)} placeholder={t('app.ME54')} format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} onChange={(e) => { e !== null && setClientAproveDatetime(e.format("YYYY-MM-DD HH:mm:ss").toString()) }} />
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
                                        <Button type="primary" onClick={update}>{t('app.ME22')}</Button>
                                        <Link to={'/dashboard/orders'}>
                                            <Button style={{ marginLeft: 5, marginRight: 10 }}>{t('app.ME21')}</Button>
                                        </Link>
                                    </Col>}
                            </Row>
                        </Card>
                    }
                </Col>
            </Row>
        </Layout>
    );
}

export default Update;