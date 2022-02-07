import { APIEndpoint } from '../services/ApiConfiguration';
const axios = require("axios");

const apiUrl = `${APIEndpoint.apiUrl}/Statistics`;

export async function getOSChartData(id) {
    return axios.get(`${apiUrl}/OSStatistics/${id}`, {
        responseType: 'application/json',
    })
    .then((response) => {
        return response.data;
    }).catch((error) => {});
}

export async function getBrowserChartData(id) {
    return axios.get(`${apiUrl}/BrowserStatistics/${id}`, {
        responseType: 'application/json',
    })
    .then((response) => {
        return response.data;
    }).catch((error) => {});
}
