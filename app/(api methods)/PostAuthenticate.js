import { GetApiEndpoint } from '@/app.config';

export default async function PostAuthenticate(data){
    const apiEndpoint = GetApiEndpoint()
    let response = await fetch(`${apiEndpoint}api/Account/authenticate`,
                        {
                            method: 'POST',
                            mode: 'cors',
                            headers:{
                                'Content-Type': 'application/json',
                                'Sec-Fetch-Site': 'cross-site',
                                'Access-Control-Allow-Origin': apiEndpoint,
                                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                            },
                            body: JSON.stringify(data)
                        }
    )

    let body = await response.json()          
    return await body
}