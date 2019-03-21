import {observable, decorate} from 'mobx'
import {AsyncStorage} from 'react-native'

import Config from '../config'
import FetchApi from '../utils/FetchApi'

class AccountStore {
    TAG = "AccountStore."

    isLoadingFb = false;

    profile = {
        name: "Dumy_",
        email: "test@dumy.com",
        photo: "https://i2.wp.com/tricksmaze.com/wp-content/uploads/2017/04/Stylish-Girls-Profile-Pictures-42.jpg?resize=629%2C629&ssl=1"
    }

    constructor(){
        this.fetch = new FetchApi("");
    }

    async login({email, password}){
        if(this.isLoadingLogin){ return false }
        this.isLoadingLogin = true;

        const data = new FormData();
        data.append('email', email)
        data.append('password', password)

        const res = await this.fetch.post('/auth/login', {}, data)

        if(res.success && res.result){
            const {access_token, user} = res.result
            // this.profile = user;
            this.setProfile(user);
            this.setToken(access_token);
        }

        this.isLoadingLogin = false;
        return res;
    }

    async loginGoogle( user ){
        this.profile = user;
        return { success: true, message: "Login success" }
    }

    async loginFacebook( accessToken ){
        this.isLoadingFb = true;

        const res = await this.fetch.get(Config.urlFacebook+"?fields=email,name,friends&access_token="+accessToken, {});
        console.log('result loginFacebook ', res)
        const { success, result } = res;
        if( success ){
            this.profile = {
                name: result.name,
                email: result.email,
                photo: "http://graph.facebook.com/"+result.id+"/picture?type=square"
            }
        }
        this.isLoadingFb = false;
        return res;
    }

}

decorate(AccountStore, {
    isLoading: observable,
    isLoadingFb: observable
})

const accountStore = new AccountStore();
export default accountStore;
