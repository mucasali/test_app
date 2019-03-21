import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { observer, inject } from 'mobx-react/native'

class Profile extends Component{

    render(){
        const { profile } = this.props.AccountStore;

        return(
            <View style={ styles.container }>
                <Text style={ styles.textTitle }>Create Account</Text>
                <View style={ styles.contentText }>
                    <Text>Register Name</Text>
                    <Text>{ profile.name }</Text>
                </View>
                <View style={ styles.contentText }>
                    <Text>Email Address</Text>
                    <Text>{ profile.email }</Text>
                </View>
                <View style={{ left:0, right:0, bottom: 20, position: 'absolute' }}>
                    <TouchableOpacity
                        style={ styles.button }
                        onPress={ () => {
                            this.props.navigator.push({ screen: "main.Map" })
                        }}
                    >
                        <Text style={{ color: '#FFF' }}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default inject("AccountStore")( observer(Profile) )

const styles = {
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF'
    },
    contentText: {
        marginVertical: 10
    },
    button: {
        flexDirection: 'row',
        height: 40,
        marginHorizontal: 40,
        marginVertical: 5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#3742FA',
        borderRadius: 5
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    }
}
