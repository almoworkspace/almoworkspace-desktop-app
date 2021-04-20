import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Spin, PageHeader, Button, Tooltip, Switch, Badge } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../../context/Socket';
import { Logout } from '../../../actions/authActions';
import { FindAll } from '../../../helpers/apis/Notification';
import Notifier from "react-desktop-notification";
import logo from '../../../assets/images/Logo-ALMO-PNG-Transparente.png';
import notifyLogo from '../../../assets/images/logo192.png';

const Navbar = () => {
    const socket = useContext(SocketContext);
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading);
    const token = useSelector(state => state.auth.token);
    const rol = useSelector(state => state.auth.user.role);
    const { t, i18n } = useTranslation();
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [languaje, setLanguaje] = useState('es');
    const [notifications, setNotifications] = useState(0);

    useEffect(() => {
        searchNotifications();
    }, []);

    useEffect(() => {
        socket.on("order_created", async data => {
            if (rol === "ADMIN") {
                const response = await FindAll(token);
                if (response.statusCode === 200) {
                    setNotifications(response.data.length);
                    Notifier.start("Almo Workspace", "Posees una nueva notificación", "https://almoworkspace.com/dashboard/notifications", notifyLogo);
                }
            }
        });

        socket.on("notification_updated", async data => {
            if (rol === "ADMIN") {
                const response = await FindAll(token);
                if (response.statusCode === 200) {
                    setNotifications(response.data.length);
                }
            }
        });

        socket.on("message_created", async data => {
            const response = await FindAll(token);
            if (response.statusCode === 200) {
                setNotifications(response.data.length);
                Notifier.start("Almo Workspace", "Posees una nueva notificación", "https://almoworkspace.com/dashboard/notifications", notifyLogo);
            }
        });
    }, []);

    const searchNotifications = async () => {
        const response = await FindAll(token);
        if (response.statusCode === 200) {
            setNotifications(response.data.length);
        }
    }

    const toggleLanguaje = () => {
        if (languaje === 'es') {
            i18n.changeLanguage('en');
            setLanguaje('en');
        } else {
            i18n.changeLanguage('es');
            setLanguaje('es');
        }
    }

    const singOut = () => {
        socket.disconnect();
        dispatch(Logout(token));
    }

    return (
        <PageHeader style={{ border: '1px solid rgb(235, 237, 240)', background: 'white', alignContent: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 30, paddingRight: 30 }} avatar={{ src: logo }} title='Almo Workspace' extra={[
            <>
                { languaje === 'es' ? `Cambiar a ingles` : `Switch to spanish`}: <Switch size="small" checked={languaje === 'es' ? false : true} onChange={toggleLanguaje} />
            </>,
            <Badge count={notifications}>
                <Tooltip title={t("app.ME12")}>
                    <Button onClick={() => { history.push('/dashboard/notifications') }} shape="circle" icon={<BellOutlined />} />
                </Tooltip>
            </Badge>,
            isLoading ?
                <Spin indicator={antIcon} style={{ marginLeft: 5 }} /> :
                <Tooltip title={t("app.ME11")}>
                    <Button onClick={singOut} shape="circle" icon={<LogoutOutlined />} />
                </Tooltip>
        ]} />
    );
}

export default Navbar;