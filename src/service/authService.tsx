import axios from 'axios';
import { BASE_URL } from './config';
import { tokenStorage } from '@state/storage';
import { useAuthStore } from '@state/authStore';
import { resetAndNavigate } from '@utils/Navigation';
import { appAxios } from './apiInterceptors';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const customerLogin = async(phone:string)=>{
    try {
        const response = await axios.post(`${BASE_URL}/customer/login`, {phone});
        const {accessToken,refreshToken,customer} = response.data;
        tokenStorage.set('accessToken',accessToken);
        tokenStorage.set('refreshToken',refreshToken);
        const {setUser} = useAuthStore.getState();
        setUser(customer);
        // eslint-disable-next-line no-trailing-spaces
        
    } catch (error) {
        console.log('login error', error);
    }
};

export const deliveryLogin = async(email:string, password:string)=>{
    try {
        const response = await axios.post(`${BASE_URL}/delivery/login`, {email, password});
        const {accessToken,refreshToken,deliveryPartner} = response.data;
        tokenStorage.set('accessToken',accessToken);
        tokenStorage.set('refreshToken',refreshToken);
        const {setUser} = useAuthStore.getState();
        setUser(deliveryPartner);
        // eslint-disable-next-line no-trailing-spaces
        
    } catch (error) {
        console.log('login error', error);
    }
};


export const refetchUSer = async(setUser:any)=>{
    try {
        const response = await appAxios.get(`/user`);
        setUser(response.data.user);
    } catch (error) {
        console.log('login error', error);
    }
};



export const refresh_tokens = async()=>{
    try {


        const refreshToken = tokenStorage.getString('refresh token')

        const response = await axios.post(`${BASE_URL}/refresh-token`,{
            refreshToken
        })

        const new_access_token=response.data.accessToken;
        const new_refresh_token=response.data.refreshToken;

        tokenStorage.set('accessToken', new_access_token);
        tokenStorage.set('refreshToken', new_refresh_token);
        return new_access_token;
        
    } catch (error) {

        console.log('Refresh Token  error', error);
        tokenStorage.clearAll();
        resetAndNavigate('CustomerLogin')
    }
};
