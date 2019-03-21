import React from 'react'
import {View,Text, TouchableOpacity, Image, Dimensions, StatusBar, ScrollView, Platform} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

import BtnProfile from './button/BtnProfile'
import BtnSearch from './button/BtnSearch'
import BtnBag from '../cart/BtnBag'

const {width, height} = Dimensions.get("window")

const header = (props) => {

    return(
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.contentLogo}
                onPress={props.actionBack}
            >
                <Icon name="left" color="#4A5461" size={18}/>
            </TouchableOpacity>
            <View style={styles.contentTitle}>
                <Text style={{fontWeight:'100'}}>{props.title}</Text>
            </View>
            <View style={styles.contentAction}>
                <BtnSearch />
                <BtnProfile navigator={props.navigator}/>
                <BtnBag navigator={props.navigator} />
            </View>
        </View>
    )
}

header.defaultProps = {
    navigator: {},
    tabs: [],
    actionBack: () => {},
    actionSearch: () => {},
    actionContact: () => {},
    actionBag: () => {}
}

const styles = {
    container: {
        flex:.1,
        flexDirection: 'row',
        paddingHorizontal:10,
        marginTop: Platform.OS == 'ios' ? 20 : 0,
        backgroundColor:'#FFF'
    },
    contentLogo: {
        flex: .1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    contentTitle: {
        flex: .6,
        justifyContent: 'center',
        alignItems:'center'
    },
    contentAction: {
        flex:0.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around'
    },
    contentIcon: {
        flexDirection:'row',
        padding:5,
        borderRadius: 20,
        borderWidth: .3,
        borderColor: "#E0E6EB"
    },
    imageIcon: {
        width: 15,
        height: 15
    }
}

export default header
