import React from 'react';
import { useParams } from 'react-router-dom';
import Orders from '../../../components/screens/dashboard/orders/Orders';
import Create from '../../../components/screens/dashboard/orders/Create';
import Update from '../../../components/screens/dashboard/orders/Update';

export const ReadOrders = () => {
    return (
        <Orders />
    );
}

export const CreateOrders = () => {
    return (
        <Create />
    );
}

export const UpdateOrders = () => {
    let { id } = useParams();
    return (
        <Update search={id} />
    );
}