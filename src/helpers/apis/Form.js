import { APP_SETTINGS } from '../utils/Constants';

export const CreateForm = async (token, object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/forms`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(object),
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return null; })
    return response;
}

export const FindAll = async (token) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/forms`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return null; })
    return response;
}

export const FindOne = async (token, id) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/forms/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return null; })
    return response;
}

export const Update = async (token, object, id) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/forms/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(object),
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return null; })
    return response;
}