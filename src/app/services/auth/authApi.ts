import axios from "axios"
import { BASE_URL } from "../constants"

interface authUserProps{
    email: string;
    password: string;
}

export const AuthUser = (data: authUserProps) => {
 return axios.post(
    BASE_URL+'/user/login',
    data,
    {headers:{"Content-type": "application/json"}},
)
}