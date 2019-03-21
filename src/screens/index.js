import {Navigation, ScreenVisibilityListener} from 'react-native-navigation'

import Message from './component/message'

import Login from './auth/login'

import Profile from './profile/'

import Map from './map'

export function registerScreens(store: {}, provider: {}){

    Navigation.registerComponent('custom.Message', ()=> Message)

    Navigation.registerComponent('auth.Login', () => Login, store, provider)

    Navigation.registerComponent('main.Profile', () => Profile, store, provider)

    Navigation.registerComponent('main.Map', () => Map, store, provider)
}

export function registerScreenVisibilityListener() {
    new ScreenVisibilityListener({
        willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
        didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
        willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
        didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
    }).register()
}
