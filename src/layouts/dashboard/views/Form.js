import React from 'react';
import { useParams } from 'react-router-dom';
import Forms from '../../../components/screens/dashboard/forms/Forms';
import Create from '../../../components/screens/dashboard/forms/Create';
import Update from '../../../components/screens/dashboard/forms/Update';

export const ReadForms = () => {
    return (
        <Forms />
    );
}

export const CreateForms = () => {
    return (
        <Create />
    );
}

export const UpdateForms = () => {
    let { id } = useParams();
    return (
        <Update search={id} />
    );
}