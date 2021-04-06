import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, MessageOutlined, FilePdfOutlined } from '@ant-design/icons';

const Sidebar = () => {
    const rol = useSelector(state => state.auth.user.role);
    const { t, i18n } = useTranslation();
    const { Sider } = Layout;
    const { SubMenu } = Menu;

    return (
        <Sider width={200} className="site-layout-background" style={{ borderRight: '0.5px solid rgb(235, 237, 240)' }}>
            <Menu
                mode="inline"               
                style={{ height: '100%' }}>
                {
                    rol === 'ADMIN' ?
                        <>
                            <Menu.ItemGroup key="g1" title={t("app.ME04")}>
                                <Menu.Item key="1" icon={<UserOutlined />}>
                                    <Link to={'/dashboard/users'}>
                                        {t("app.ME05")}
                                    </Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title={t("app.ME07")}>
                                <Menu.Item key="2" icon={<FilePdfOutlined />}>
                                    <Link to={'/dashboard/orders'}>
                                        {t("app.ME08")}
                                    </Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g3" title={t("app.ME09")}>
                                <Menu.Item key="3" icon={<MessageOutlined />}>
                                    <Link to={'/dashboard/chat'}>
                                        {t("app.ME10")}
                                    </Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </>
                        :
                        <>
                            <Menu.ItemGroup key="g1" title={t("app.ME07")}>
                                <Menu.Item key="1" icon={<FilePdfOutlined />}>
                                    <Link to={'/dashboard/orders'}>
                                        {t("app.ME08")}
                                    </Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title={t("app.ME09")}>
                                <Menu.Item key="2" icon={<MessageOutlined />}>
                                    <Link to={'/dashboard/chat'}>
                                        {t("app.ME10")}
                                    </Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </>
                }
            </Menu>
        </Sider>
    );
}

export default Sidebar;