import React from 'react';
import { useParams } from 'react-router-dom';
import Tools from '../../../components/screens/dashboard/tools/Tools';
import Create from '../../../components/screens/dashboard/tools/Create';
import Update from '../../../components/screens/dashboard/tools/Update';

export const ReadTools = () => {
    return (
        <Tools />
    );
}

export const CreateTools = () => {
    return (
        <Create />
    );
}

export const UpdateTools = () => {
    let { id } = useParams();
    return (
        <Update search={id} />
    );
}