import { GetApiEndpoint } from '@/app.config';

/////////////////////////
//
//  JSON Request blueprint:
//    {
//      "firstName": firstName,
//      "lastName": lastName,
//      "email": email,
//      "userName": email,
//      "password": password,
//      "confirmPassword": confirmPassword,
//    }

export default async function PostRegister(data){
    const apiEndpoint = GetApiEndpoint()
    let response = await fetch(`${apiEndpoint}api/Account/register`,
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
    console.log(body)
    return await body
}