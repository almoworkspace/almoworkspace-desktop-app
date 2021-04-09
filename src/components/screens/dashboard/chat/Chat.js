import React, { useState, useEffect, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Layout, Row, Col, Input, Typography, List, Spin, Badge, Empty, Divider, Button, Tooltip, Modal } from 'antd';
import { LoadingOutlined, SendOutlined } from '@ant-design/icons';
import moment from 'moment';
import Notifier from "react-desktop-notification"
import { SocketContext } from '../../../../context/Socket';
import { FindAll } from '../../../../helpers/apis/User';
import { FindAllMe, FindOne, CreateMessage, Update } from '../../../../helpers/apis/Chat';

const Chat = () => {
    const socket = useContext(SocketContext);
    const token = useSelector(state => state.auth.token);
    const me = useSelector(state => state.auth.user.id);
    const meFullname = useSelector(state => state.auth.user.fullname);
    const { t } = useTranslation();
    const { Search, TextArea } = Input;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(null);
    const [chat, setChat] = useState(null);
    const [data, setData] = useState(null);
    const [staticData, setStaticData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { Text, Title } = Typography;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const bottomList = useRef();

    useEffect(() => {
        const request = async () => {
            const response = await FindAll(token);
            setData(response.data);
            setStaticData(response.data);
        };
        request();
    }, []);

    useEffect(() => {
        const request = async () => {
            const response = await FindAllMe(token, me);
            if (response.statusCode === 200) {
                setMessages(response.data);
            } else {
                setMessages([]);
            }
        };
        request();
    }, []);

    useEffect(() => {
        socket.on("message_created", async data => {
            if (data.to === me || data.from === me) {
                const response = await FindAllMe(token, me);
                if (response.statusCode === 200) {
                    setMessages(response.data);
                } else {
                    setMessages([]);
                }
               
                setTimeout(() => {
                    
                }, 1000);

                console.log(chat);
                /// If chat selected
                if (chat !== null) {
                    if ((data.to === me && data.from === chat.id) || (data.to === chat.id && data.from === me)) {
                        await searchChat(chat.id, chat.user);
                    }
                }
            }
        });
    }, []);

    const filterByText = (value) => {
        if (value === '') {
            setData(staticData);
        } else {
            let tmp = staticData.filter((item) => item.username.includes(value) || item.Profile[0].fullname.includes(value) || item.Profile[0].phone.includes(value) || item.Profile[0].address.includes(value));
            setData(tmp);
        }
    }

    const searchChat = async (id, username) => {
        setMessage('');
        const response = await FindOne(token, id, me);
        if (response.statusCode === 200) {
            setChat({ id: id, user: username, chat: response.data });
            scrollToBottom();           
            await Update(token, { to: id, from: me });
            const responses = await FindAllMe(token, me);
            if (responses.statusCode === 200) {
                setMessages(responses.data);
            } else {
                setMessages([]);
            }
        } else {
            setChat(null);
        }
    }

    const createMessage = async () => {
        if (message === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: t('code.CO01')
            });
        } else {
            const obj = {
                from: me,
                to: chat.id,
                message: message
            }
            setIsLoading(true);
            const response = await CreateMessage(token, obj);
            if (response.statusCode === 200) {               
                const responses = await FindOne(token, chat.id, me);
                if (responses.statusCode === 200) {
                    setChat({ id: chat.id, user: chat.user, chat: responses.data });
                    scrollToBottom();
                } else {
                    setChat(null);
                }
                setIsLoading(false);
                setMessage('');
            } else {
                setIsLoading(false);
                setMessage('');
            }
        }
    }

    const scrollToBottom = () => {
        bottomList.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    return (
        <Layout style={{ background: 'white' }}>
            <Row style={{ margin: 20 }}>
                <Col span={8} style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Breadcrumb>
                        <Breadcrumb.Item>{t('app.ME23')}</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/chat'}>{t('app.ME10')}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Search
                        placeholder={t('app.ME29')}
                        allowClear
                        style={{ width: 200, marginLeft: 20 }}
                        onChange={(e) => { filterByText(e.target.value) }}
                    />
                    <Title level={5} style={{ marginLeft: 20, marginTop: 20 }}>{t("app.ME05")}</Title>
                    {
                        data === null ?
                            <Spin indicator={antIcon} size='large' />
                            :
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                style={{ marginLeft: 20 }}
                                renderItem={item => {
                                    if (item.id !== me) {
                                        if (messages === null) {
                                            return (
                                                <List.Item onClick={() => { searchChat(item.id, item.Profile[0].fullname) }}>
                                                    <List.Item.Meta
                                                        title={<Text>{item.Profile[0].fullname}</Text>}
                                                        description={`${item.username}`}
                                                    />
                                                </List.Item>
                                            )
                                        } else {
                                            return (
                                                <List.Item onClick={() => { searchChat(item.id, item.Profile[0].fullname) }}>
                                                    <List.Item.Meta
                                                        title={<Text>{item.Profile[0].fullname}</Text>}
                                                        description={`${item.username}`}
                                                    />
                                                    <div>
                                                        <Badge count={messages.filter((it) => it.FromId === item.id && it.read === 0).length} />
                                                    </div>
                                                </List.Item>
                                            )
                                        }
                                    }
                                }}
                            />
                    }
                </Col>
                <Col span={18} style={{ paddingLeft: 20, paddingRight: 20 }}>
                    {
                        chat === null ?
                            <Empty description={false} />
                            :
                            <Layout style={{ backgroundColor: 'white' }}>
                                <div style={{ maxHeight: '57vh', overflowY: 'scroll' }}>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={chat.chat}
                                        renderItem={item => {
                                            if (item.FromId === me) {
                                                let time = moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss");
                                                return (
                                                    <List.Item>
                                                        <List.Item.Meta
                                                            title={<Text>{meFullname}</Text>}
                                                            description={`${item.message} -
                                                        ${time}`}
                                                        />
                                                    </List.Item>
                                                )
                                            } else {
                                                let time = moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss");
                                                return (
                                                    <List.Item>
                                                        <List.Item.Meta
                                                            title={<Text>{chat.user}</Text>}
                                                            description={`${item.message} -
                                                        ${time}`}
                                                        />
                                                    </List.Item>
                                                )
                                            }
                                        }}
                                    />
                                    <div ref={bottomList} />
                                </div>
                                <Divider />
                                <Row>
                                    <Col span={23}>
                                        <TextArea
                                            showCount
                                            maxLength={300}
                                            style={{ width: '99%' }}
                                            value={message}
                                            onChange={(e) => { setMessage(e.target.value) }}
                                        />
                                    </Col>
                                    <Col span={1}>
                                        {
                                            isLoading ?
                                                <Spin indicator={antIcon} size='large' />
                                                :
                                                <Tooltip title={t("app.ME62")}>
                                                    <Button onClick={createMessage} shape="circle" icon={<SendOutlined />} />
                                                </Tooltip>
                                        }
                                    </Col>
                                </Row>
                            </Layout>
                    }
                </Col>
            </Row>
        </Layout>
    );
}

export default Chat;