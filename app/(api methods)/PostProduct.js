import { GetApiEndpoint } from '@/app.config';
import Cookies from 'universal-cookie';

export default async function PostProduct(data){
    const cookies = new Cookies()
    const apiEndpoint = GetApiEndpoint()
    let response = await fetch(`${apiEndpoint}api/v1/Product`,
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