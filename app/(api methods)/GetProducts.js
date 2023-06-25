import { GetApiEndpoint } from '@/app.config';

export default async function GetProducts(pageNumber = 1 , pageSize = 3, orderBy = "PriceAsc" ){
    const apiEndpoint = GetApiEndpoint()
    console.log(apiEndpoint)
    let response = await fetch(`${apiEndpoint}api/v1/product?PageNumber=${pageNumber}&PageSize=${pageSize}&OrderBy=${orderBy}`,
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