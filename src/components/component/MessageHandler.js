import React from 'react';
import { Modal } from 'antd';
import i18n from '../../i18n';

const MessageHandler = (code) => {
    return Modal.error({
        title: 'Mensaje del sistema',
        content: i18n.t(`code.${code}`)
    });
}

export default MessageHandler;