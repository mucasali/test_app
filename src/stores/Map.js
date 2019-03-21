import {observable, decorate} from 'mobx'
import {AsyncStorage} from 'react-native'

import Config from '../config'
import FetchApi from '../utils/FetchApi'

class MapStore {
    TAG = "MapStore."

    isLoading = false

    places = [];

    constructor(){
        this.fetch = new FetchApi("http://demo7990087.mockable.io");
    }

    async getLocation( ){
        if( this.isLoading ){ return false }
        this.isLoading = true;
        
        const res = await this.fetch.get('/test', {})

        if(res.success && res.result){
            const { success, message, data } = res.result;
            this.places = data;
        }

        this.isLoading = false;
        return res;
    }

}

decorate(MapStore, {
    isLoading: observable
})

const mapStore = new MapStore();
export default mapStore;
