import { GetApiEndpoint } from '@/app.config';

export default async function GetUserBasket(email){
    const apiEndpoint = GetApiEndpoint()
    //get by user email, first or default ordered by date (latest) with a pending status (basket)
    let response = await fetch(`${apiEndpoint}api/v1/Order/GetBasket/${email}`,
                        {
                            method: "GET",
                            mode: 'cors',
                            headers:{
                                'Sec-Fetch-Site': 'cross-site',
                                'Access-Control-Allow-Origin': apiEndpoint,
                                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                            },
                        }
    )

    let body = await response.json()          

    return await body
}