import { APP_SETTINGS } from '../utils/Constants';

export const CreateMessage = async (token, object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/chats`, {
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

export const FindAllMe = async (token, from) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/chats/${from}`, {
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

export const FindOne = async (token, to, from) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/chats/${to}/${from}`, {
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

export const Update = async (token, object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/chats`, {
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