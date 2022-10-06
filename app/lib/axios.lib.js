import axios from "axios";
import { response } from "express";
import config from "../config/index.js";

class AxiosService {

    //USER
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

    //MARKET
    static async getMarketData (){
        return axios.post(config.bpEndpoints.getMarketData)
        .then (response => {
            return response.data
        })
    }
    
    static async getMarketList (params){
        return axios.post(config.bpEndpoints.getMarketList, params)
        .then(response => {
            return response.data
        })
    }

    static async getMarketDetail (seller, uniqueId){
        return axios.post(config.bpEndpoints.getMarketDetail, {
            seller,
            uniqueId
        })
        .then(response => {
            return response.data
        })
    }
}

export default AxiosService;
