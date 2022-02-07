import { APIEndpoint } from './ApiConfiguration';
const axios = require("axios");

const apiUrl = `${APIEndpoint.apiUrl}/Urls`;

export async function getUrlsData() {
    return axios.get(`${apiUrl}/urls`)
    .then((response) => {
        return response.data;
    }).catch((error) => {});
}

export async function createUrlShorten(urlObject) {
    return axios.post(`${apiUrl}/url`, { originalUrl: urlObject })
    .then((response) => {
        return response.data;
    }).catch((error) => {});
}

export async function updateUrlShorten(urlObject) {
    return axios.put(`${apiUrl}/url`, urlObject, {
        responseType: 'application/json',
    })
    .then((response) => {
        return response.data;
    }).catch((error) => {});
}

export async function deleteUrlShorten(id) {
    return axios.delete(`${apiUrl}/url/${id}`, {
        responseType: 'application/json',
    })
    .then((response) => {
        return response.data;
    }).catch((error) => {});
}
