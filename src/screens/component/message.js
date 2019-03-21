import React from 'react'
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import config from '../../config'

const {height, width} = Dimensions.get('window');
const themes = {
    success : { title: "Success", background: config.color.success, icon: "md-checkmark-circle" },
    warning : { title: "Warning", background: config.color.warning, icon: "md-warning" },
    error : { title: "Error", background: config.color.error, icon: "md-alert" },
    info : { title: "Info", background: config.color.primary, icon: "md-information-circle" }
}


export default ({ title = "", message = "", theme = "info" }) =>{
    // console.log('on message', message, type)
    const type = themes[theme];
    // switch (type) {
    //     case 'success':
    //         backgorund = config.color.success;
    //
    //         break;
    //     case 'warning': backgorund = config.color.warning; break;
    //     case 'primary': backgorund = config.color.primary; break;
    //     default:
    // }

    return(
        <View style={[ styles.container, { backgroundColor: type.background }]}>
            <Icon name={ type.icon } color="#FFF" size={35} style={{fontWeight:'700'}}/>
            <View style={ styles.content }>
                <Text style={ styles.title }>{ type.title }</Text>
                <Text style={ styles.text }>{ message }</Text>
            </View>
        </View>
    )
}

const styles = {
    container: {
        flexDirection: "row",
        top: Platform.OS === 'ios' ? 0 : 0,
        height: (height/8),
        width: (width),
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex:1,
        marginLeft: 10,
        justifyContent:'space-between'
    },
    title: {
        color: '#fff',
        fontWeight: "bold",
        fontFamily: config.fontFamily,
        fontSize: 14
    },
    text: {
        color: '#fff',
        fontWeight: "400",
        fontFamily: config.fontFamily,
        fontSize: 14
    }
}
