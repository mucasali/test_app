import {GoogleSignin, statusCodes} from 'react-native-google-signin'

import Config from '../../../config'

const configure = async() => {
    console.log('Google.configure', __DEV__)
    const {webClientId, clientID_dev, clientId_production} = Config.googleKey;
    try {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true, autoResolve: true});
        await GoogleSignin.configure({
            webClientId: webClientId,
            clientID: __DEV__ ? clientID_dev : clientId_production,
            offlineAccess: true
        })
    }catch (err) {
        console.log("Google.configure.error => There are any error", err.message);
    }
}

const signin = async () => {
    try {
		await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const userInfo = await GoogleSignin.signIn();
        console.log('Google.signin ', userInfo)
        return {status: true, data: userInfo}
    } catch (error) {
        console.log('Google.signin.error ', error)
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        } else {
        // some other error happened
        }
        return {status: false, data: null, message: "Auth Goggle is Canceled"}
    }
}

export default {configure, signin}
