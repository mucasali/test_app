import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation';

import {registerScreens, registerScreenVisibilityListener} from './screens';
import Provider from './utils/MobxRnnProvider'
import Stores from './stores'

registerScreens(Stores, Provider)

Navigation.startSingleScreenApp({
    screen: {
        screen: 'auth.Login'
        // screen: 'main.Profile'
    },
    appStyle: {
        keepStyleAcrossPush: false,
        navBarButtonColor: "#7A909E",
        statusBarColor: '#FFF',
        statusBarTextColorScheme: 'dark',
        navBarBackgroundColor:'#FFF',
        navBarHidden: true,
    }
})
