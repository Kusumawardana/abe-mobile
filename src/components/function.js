import Axios from 'axios';
import * as React from 'react';
import {
    Alert,
    ALert
} from 'react-native';

const API_KEY = require('../routes/api');

const action = (url, data, method) => {
    // return url;
    return Axios({
        method: method,
        headers: {
            'Content-Type' : 'multipart/form-data'
        },
        url: url,
        data: data
    })
        .then(result => {
            return result
        });
}

export default action;
