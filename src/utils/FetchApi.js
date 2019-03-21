
import {Navigation} from 'react-native-navigation'

// const failAuth = ()=>{
//     Navigation.startSingleScreenApp({
//         screen: {
//             screen: 'auth.Main'
//         }
//     })
// }

const fetchApi = async (url, option) => {
    let resJSON = {success : false}
    try{
        const response = await fetch(url, option)
        console.log('responce fetchApi ', url, option, response);
        resJSON.result = await response.json();

        if(response.status === 200 || response.status === 201){
            resJSON.success = true;
        }else if(response.status === 403 || resJSON.result.error == "Invalid API Key"){
            // failAuth()
        }

    }catch(err){
        console.log('fetch error ', err, url)
        resJSON.message = err.message
    }
    console.log('resJSON ', resJSON)
    return resJSON;
}

export default class FetchApi{

    headers = {
        "X-Requested-With" : "XMLHttpRequest",
        "Content-Type" : "application/json"
    }

    constructor(url){
        this.url = url;
    }

    async get(endPoint, header){
        return await fetchApi(this.url+endPoint, {
            method : 'GET',
            headers : Object.assign(header, this.headers)
        });
    }

    async post(endPoint, header, body){
        return await fetchApi(this.url+endPoint, {
            method: 'POST',
            headers: Object.assign(this.headers, header),
            body: body
        })
    }

    async put(endPoint, header, body){
        return await fetchApi(this.url+endPoint, {
            method: 'PUT',
            headers: Object.assign(header, this.headers),
            body: JSON.stringify(body)
        })
    }

    async delete(endPoint, header, body){
        return await fetchApi(this.url+endPoint, {
            method: 'DELETE',
            headers: Object.assign(header, this.headers),
            body: JSON.stringify(body)
        })
    }

}
