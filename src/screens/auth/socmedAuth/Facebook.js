
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  LoginManager
} = FBSDK;

// const dumyData = {
//     accessToken: "EAAFiyoz7QNIBAIOZBpusPZAMqbL0VaGZBnlwSC03ZCSS9rLZAZBFigwJHLcXJcIZAeUmJml4QCe8uc4beZAUfxIMyMbuaGckZBZCjWkgRf4GJVk1BQET6QUMsweKs9zmPomF0FuJSlXohBZBJX8fgBYr5ZBuEdwuXGSMfyQRopg5NVGfI4WLpZAm26Y9ttUzOTyr8jT27hQsZCZBm1qrwZDZD",
//     accessTokenSource: "WEB_VIEW",
//     applicationID: "432484047280196",
//     declinedPermissions: [],
//     expirationTime: 1543356414218,
//     lastRefreshTime: 1538183628220,
//     permissions:["public_profile", "email"],
//     userID: "513327695805996"
// }

const signin = async () => {
	// const {Account} = this.props;
    // return {status: true, data: dumyData}
    try{
        console.log('loginFB === ', FBSDK);
        const tokenFB = await AccessToken.getCurrentAccessToken();
        console.log('tokenFB ', tokenFB)
        if(tokenFB && tokenFB.accessToken){
            await LoginManager.logOut();
            console.log('clear tokenFB ', tokenFB)
        }

		let resFB = await LoginManager.logInWithReadPermissions(['email','public_profile']);
        console.log('resFB ', resFB)
		if( !resFB.isCancelled){
			// Account.isLoading = true;
			let data = await AccessToken.getCurrentAccessToken();
			console.log('loginFB ', data);
            return {status: true, data: data}
		}else{
            // this.showToast({message: "Login Canceled", theme: "warning"})
            return {status: false, data: null, message: "Auth Facebook is Canceled"}
        }
    }catch(err){
        console.log('loginFB error ', err);
        return {status: false, data: null, message: err.message}
        // this.showToast({message: "Login Facebook Failed "+err, theme: "warning"})
    }
}

export default {signin}
