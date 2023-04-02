import axios from "../api/axios.js";
import { useState } from "react";
import { useAuthDispatch } from "../context/AuthContext.js";


export const useRegister = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { dispatch } = useAuthDispatch();

    const register = async (user, email,password) => {
        setIsLoading(true);
        setError(null);

         const response = await axios.post('/api/signup',
        JSON.stringify(
          { user, email, password }),
       {
          headers: {'Accept': 'application/json' ,'Content-Type': 'application / json' }
             });
        
        console.log(response?.data);
        
const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error)
        }
        if(response.ok) {
            localStorage.setItem('user', JSON.strongify(json))

            //auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
    }
    return {register, error, isLoading}
}