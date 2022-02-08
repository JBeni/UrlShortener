import { APIEndpoint } from './ApiConfiguration';
import { notifyToastError } from './helper.service';
const axios = require("axios");

const apiUrl = `${APIEndpoint.apiUrl}/Urls`;

export async function getUrlsData() {
    return axios.get(`${apiUrl}/urls`)
    .then((response) => {
        return response.data;
    }).catch((error) => {
        notifyToastError(error.response.data.error);
    });
}

export async function createUrlShorten(urlObject) {
    return axios.post(`${apiUrl}/url`, { originalUrl: urlObject })
    .then((response) => {
        return response.data;
    }).catch((error) => {
        notifyToastError(error.response.data.error);
    });
}

export async function updateUrlShorten(urlObject) {
    return axios.put(`${apiUrl}/url`,  { id: urlObject }, {
        responseType: 'application/json',
    })
    .then((response) => {
        return response.data;
    }).catch((error) => {
        notifyToastError(error.response.data.error);
    });
}

export async function deleteUrlShorten(id) {
    return axios.delete(`${apiUrl}/url/${id}`, {
        responseType: 'application/json',
    })
    .then((response) => {
        return response.data;
    }).catch((error) => {
        notifyToastError(error.response.data.error);
    });
}
