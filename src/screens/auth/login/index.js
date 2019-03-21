
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import { inject, observer } from 'mobx-react/native'

import GoogleAuth from '../socmedAuth/Google'
import FacebookAuth from '../socmedAuth/Facebook'

class Login extends Component<Props> {

    static navigatorStyle = {
        navBarHidden: true,
        statusBarHidden: true

    };

    componentDidMount(){
        GoogleAuth.configure()
    }

    async loginProvider(type, data){
        console.log('LoginProvider ', type, data);
        const {AccountStore, navigator} =  this.props;
        let result ={success: false}
        if(type == 'facebook'){
            result = await AccountStore.loginFacebook(data.accessToken)
        }else{
            result = await AccountStore.loginGoogle(data.user)
        }

        if(result.success){
            this.props.navigator.push({
                screen: "main.Profile",
                passProps: {
                    userData: data.user
                }
            })
        }
    }

    renderBtnFb(){
        return this.props.AccountStore.isLoadingFb
                ? <ActivityIndicator />
                : <TouchableOpacity
                    style={[ styles.button, {backgroundColor:'#3A5999'} ]}
                    onPress={async ()=>{
                        const { status, data } = await FacebookAuth.signin()
                        console.log('facebookProfile ', data, status, data.accessToken)
                        if( status && data.accessToken ){
                            this.loginProvider('facebook', data)
                        }
                    }}
                >
                    <View style={ styles.contentIcon }>
                        <Image source={ require('../../../assets/images/icon-facebook.png') } style={ styles.imageIcon }/>
                    </View>
                    <View style={ styles.contentText }>
                        <Text style={{ color: '#FFF' }}>Continue with Facebook</Text>
                    </View>
                </TouchableOpacity>
    }

    renderBtnGoogle(){
        return(
            <TouchableOpacity
                style={ styles.button }
                onPress={async ()=>{
                    const profileGoogle = await GoogleAuth.signin()
                    console.log('googleProfile ', profileGoogle)
                    if( profileGoogle ){
                        this.loginProvider('google', profileGoogle.data)
                    }
                }}
            >
                <View style={ styles.contentIcon }>
                    <Image source={ require('../../../assets/images/icon-google.png') } style={ styles.imageIcon }/>
                </View>
                <View style={ styles.contentText }>
                    <Text>Continue with Google</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderBtnPhone(){
        return(
            <TouchableOpacity
                style={ styles.button }
                onPress={ () => {
                    this.props.navigator.push({
                        screen: "main.Profile"
                    })
                }}
            >
                <View style={ styles.contentIcon }>
                    <Image source={ require('../../../assets/images/icon-phone.png') } style={ styles.imageIcon }/>
                </View>
                <View style={ styles.contentText }>
                    <Text>Continue with mobile no.</Text>
                </View>
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <ImageBackground source={require('../../../assets/images/hero.png')} style={{width: '100%', height: '100%'}}>
                <View style={{ flex:1, justifyContent:'space-between', margin: 10 }}>
                    <View style={{ flex:.1, alignItems:'center', justifyContent:'center'}}>
                        <Text style={ styles.textTitle }>Alpha Parking</Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        { this.renderBtnFb() }
                        { this.renderBtnGoogle() }
                        { this.renderBtnPhone() }
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

export default inject("AccountStore")( observer(Login) )

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  contentIcon: {
    flex: .1,
    alignItems: 'center'
  },
  contentText: {
    flex: .8,
    alignItems: 'center'
  },
  textTitle: {
      color: '#FFF',
      fontSize: 20
  },
  button: {
      flexDirection: 'row',
      height: 40,
      marginHorizontal: 40,
      marginVertical: 5,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#FFF',
      borderRadius: 5
  }
});
