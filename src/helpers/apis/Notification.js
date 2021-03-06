import { APP_SETTINGS } from '../utils/Constants';

export const FindAll = async (token) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/notifications`, {
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

export const Update = async (token, id) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/notifications/${id}`, {
        method: 'PUT',
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