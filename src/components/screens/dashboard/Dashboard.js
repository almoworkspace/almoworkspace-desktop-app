import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Row, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/images/Logo-ALMO-PNG-Transparente.png';

const Dashboard = () => {
    const { t } = useTranslation();
    const { Text } = Typography;

    return (
        <Layout style={{ background: 'white' }}>
            <Row style={{ margin: 20 }}>
                <Col span={8}>
                    <Breadcrumb>
                        <Breadcrumb.Item>{t('app.ME23')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <img src={logo} style={{ height: 200, width: 400 }} />
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center' }}>
                    <Text strong style={{ marginTop: 10 }}>Almo Workspace © 2021. V1.2.1</Text>
                </Col>
            </Row>
        </Layout>
    );
}

export default Dashboard;