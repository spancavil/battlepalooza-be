import axios from "axios";
import config from "../config/index.js";

class AxiosService {
    static async sendCode(email){
        return axios.post(`${config.bpEndpoints.passcode}`, {
            email
        }).then(response => {
            console.log(response.data)
            if (response.data.result === 0) return {success: true}
            else return {success: false}
        })
    }

    static async signUp (email, code){
        return axios.post(`${config.bpEndpoints.signUp}`, {
            email,
            passcode: code
        })
        .then (response => {
            return response.data
        })
    }

    static async login (email, code){
        return axios.post(`${config.bpEndpoints.login}`, {
            email,
            passcode: code
        })
        .then (response => {
            return response.data
        })
    }
}

export default AxiosService;
