import { GetApiEndpoint } from '@/app.config';
import Cookies from 'universal-cookie';
import GetUserBasket from './GetUserBasket';
import { GetBasket } from '../(global methods)/Basket';

export default async function PostOrderItem(data){
    const cookies = new Cookies()
    const apiEndpoint = GetApiEndpoint()

    console.log(data)
    let response = await fetch(`${apiEndpoint}api/v1/OrderItem/`,
                        {
                            method: 'POST',
                            mode: 'cors',
                            headers:{
                                'Content-Type': 'application/json',
                                'Sec-Fetch-Site': 'cross-site',
                                'Access-Control-Allow-Origin': apiEndpoint,
                                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                                'Authorization': 'Bearer ' + cookies.get("bearer_token")
                            },
                            body: JSON.stringify(data)
                        }
    )

    let body = await response.json()          
    return await body
}


