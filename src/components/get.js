import Axios from 'axios';
import * as React from 'react';
import {
    Alert,
    ALert
} from 'react-native';

const API_KEY = require('../routes/api');

const actionget = (url) => {
    return Axios.get(url)
        .then(result => {
            return result
        });
}

export default actionget;
