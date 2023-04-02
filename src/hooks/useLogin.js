import Axios from "../api/axios.js";
import { useState } from "react";
import { useAuthContext } from "./useAuthCtx.js";

export const useLogin = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

 const res = await Axios.post('/api/login',
     {
         headers: { 'Content-Type': 'application / json' },
        
           body:   JSON.stringify({ email: email, password: password } )
             });
       
const json = await res.json();
        console.log(json);
        if (!res.ok) {
            setIsLoading(false);
            setError(json.error)
        }
        if(res.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            //auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
    }
    return {login, error, isLoading}
}