import { APIEndpoint } from '../services/ApiConfiguration';
const axios = require("axios");

const apiUrl = `${APIEndpoint.apiUrl}/Statistics`;

export async function getOSChartData() {
    return axios.get(`${apiUrl}/OSStatistics`, {
        responseType: 'application/json',
    })
    .then((response) => {
        return response;
    }).catch((error) => {});
}

export async function getBrowserChartData() {
    return axios.get(`${apiUrl}/BrowserStatistics`, {
        responseType: 'application/json',
    })
    .then((response) => {
        return response;
    }).catch((error) => {});
}
