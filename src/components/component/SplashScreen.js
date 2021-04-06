import React from 'react';
import { Row, Col, Typography, Input, Button, Space, Modal, Select, Spin } from 'antd';

const SplashScreen = () => {
    return (
        <Row>
            <Col span={24}>
                <Row style={{ flex: 1, justifyContent: 'center', alignContent: 'center', height: '100vh' }}>
                    <img src={`${process.env.PUBLIC_URL}/assets/images/Logo-ALMO-PNG-Transparente.png`} style={{ height: 150, width: 250, alignSelf: 'center' }} />
                </Row>
            </Col>
        </Row>
    );
}

export default SplashScreen;