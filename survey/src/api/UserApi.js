import axios from 'axios';
import { HOST_URL } from './constants';

class UserApi {

    static login(username, password) {
        const URL = HOST_URL + '/login';
        return axios.get(
            URL,
            {
                auth: {
                    username: username,
                    password: password
                },
                withCredentials: true,
            }
        )
            .then(response => { return response.data; })
            .catch(error => {
                // if(error.response && error.response.data.error){
                //     throw(error.response.data.error)
                // }
                // throw(error.message);
                throw error;
            });
    }

    static logout() {
        const URL = HOST_URL + '/logout';
        return axios.get(URL, { withCredentials: true }
        )
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            })
    }

    static register(registerData) {
        const URL = `${HOST_URL}/register`;
        const registerDataTmp = registerData;
        registerDataTmp['email'] = registerDataTmp['username'];
        return axios.post(URL, registerDataTmp, { withCredentials: true });
    }

    static getCaptcha() {
        const URL = `${HOST_URL}/captchas`;
        return axios.get(URL, { responseType: 'arraybuffer', withCredentials: true, })
            .then(response => {
                const base64Str = Buffer.from(response.data, 'binary')
                    .toString('base64')
                return `data:image/png;base64, ${base64Str}`;
            })
            .catch(error => {
                throw error;
            })
    }

    static getPersonalInfo() {

        const URL = `${HOST_URL}/profile`;
        return axios.get(
            URL,
            { withCredentials: true, }
        ).then(response => {
            return response.data;
        }).catch(error => {
            throw error;
        })
    }

    static getUserSurveysHistories() {

        const URL = `${HOST_URL}/surveys/history`;
        return axios.get(
            URL,
            { withCredentials: true, }
        ).then(response => {
            return response.data;
        }).catch(error => {
            throw error;
        })
    }


}

export default UserApi;
