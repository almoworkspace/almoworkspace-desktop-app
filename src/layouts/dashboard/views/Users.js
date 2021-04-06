import React from 'react';
import { useParams } from 'react-router-dom';
import Users from '../../../components/screens/dashboard/users/Users';
import Create from '../../../components/screens/dashboard/users/Create';
import Update from '../../../components/screens/dashboard/users/Update';

export const ReadUsers = () => {
    return (
        <Users />
    );
}

export const CreateUser = () => {
    return (
        <Create />
    );
}

export const UpdateUser = () => {
    let { id } = useParams();
    return (
        <Update search={id} />
    );
}