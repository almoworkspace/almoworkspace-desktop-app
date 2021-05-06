import { APP_SETTINGS } from '../utils/Constants';

export const CreateOrder = async (token, object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(object)
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return null; })
    return response;
}

export const UpdateOrder = async (token, id, object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(object)
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return null; })
    return response;
}

export const ExportOrderToPDF = async (token, object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/orders/pdf`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(object)
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return null; })
    return response;
}

export const FindAll = async (token) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/orders`, {
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
    const response = await fetch(`${APP_SETTINGS.API_URL}/orders/${id}`, {
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

export const UploadFile = async (token, file) => {
    var formData = new FormData();

    if (file != null) {
        formData.append('image',
            file
        );
    }

    const response = await fetch(`${APP_SETTINGS.API_URL}/file/upload`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
}

export const DownloadFile = async (token, code) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/file/download/${code}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(result => { return result.blob(); })
        .then(blob => {             
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${code}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(error => { return null; })
    return response;
}

export const DownloadFileDinamic = async (token, code) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/file/download/dinamic-${code}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(result => { return result.blob(); })
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `dinamic-${code}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            return true;
        })
        .catch(error => { return null; })
    return response;
}