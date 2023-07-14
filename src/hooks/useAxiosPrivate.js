// this hook is just to attach the interceptors to this axios instance 

import {axiosPrivate} from "../api/axios";
import { useEffect}from "react";
import userRefreshToken from "./useRefreshToken"  ;
import useAuth from "./useAuth";



const useAxiosPrivate = () => {

    const refresh = userRefreshToken()
    const {auth} = useAuth();


    useEffect(()=>{

            const requestIntercept = axiosPrivate.interceptors.request.use(

                config => {

                    if(!config.headers['Authorization']){

                    

                    //if authorizaton header doesnot exist the we know its not a retry,this will b the first attempt 

                    config.headers['Authorization'] = 'Bearer $(auth?.accessToken}'  //we are getting the actual auth state and grab the access token out of our state,so this could be the access token we were given intially when we signed in or it could be the access token that we got after a refres either way ,but this is the intial request we know that the authorization header is not set so we are passing that in other wise if it is set we know its retry and its already been set down here after a 403  
                    }
                    return config;

                },(error) =>    Promise.reject(error)            //we pass that over just an anony fuct and that goes to promise.rehect 
            )

                const responseIntercept = axiosPrivate.interceptors.response.use(
                    response => response ,
                    async(error) => {
                        //for if tokem has expired 
                        const prevRequest = error?.config;
                        if(error?.response?.status === 403 && ! prevRequest?.sent){
                                // if request gets forbiddeen ie 403 ,if request failed due to expiry or also checking a private property  if sent doesnot exist or happen to be  or if it is not true essentia;;y and that is because we dont want to get in this endless loop ,that couls happen of the 403 so we only want to retry once and the sent property indicates that 

                                prevRequest.sent = true ;

                                const newAccessToken =  await refresh()     //we will get he new refresh token 

                                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`       //we arw accessingthis previous request and we will get in to the headers and then we are going to get in to the authorization setting and this is where we set the token ,

                                return axiosPrivate(prevRequest);       //so we have updated the request with our refresh tokken so we should have a new access token  and now we are making the request again 

                        }
                        return Promise.reject(error)
                    }
                );

                        return () => {
                            axiosPrivate.interceptors.request.eject(requestIntercept)
                            axiosPrivate.interceptors.response.eject(responseIntercept)

                        }

    },[auth,refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;

// interceptors you can think mostly like a js event listener but we need to remove it also because if not you could attach more and more and we wouldnt want that ,it will create the mess with outr request and responses ,