import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Carousel from 'react-native-snap-carousel'
import { inject, observer } from 'mobx-react/native'

import CustomMarker from '../component/CustomMarker'

const {width, height} = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE = -7.783218
const LONGITUDE = 110.43426
const LATITUDE_DELTA = 0.006
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO


class Map extends Component{

    static navigatorStyle = {
        navBarHidden: true,
        statusBarColor: '#3742FA'
    };

    componentDidMount(){
        this.loadData();
    }

    async loadData(){
        const { MapStore } = this.props;
        const res = await MapStore.getLocation();
    }

    renderNavbar( profile ){
        const { name, email, photo } = profile;

        return(
            <View style={ styles.navbar}>
                <View style={{ flex:.2 }}>
                    <Image source={{ uri: photo}} style={ styles.thumb }/>
                </View>
                <View style={{ flex: .8, justifyContent:'space-around', alignItems:'flex-start', marginLeft: 10 }}>
                    <Text style={ styles.textNavbar }>{ name }</Text>
                    <Text style={ styles.textNavbar }>{ email }</Text>
                </View>
                <View style={{ flex: .1, alignItems:'flex-end' }}>
                    <Image source={ require('../../assets/images/Shape.png') }/>
                </View>
            </View>
        )
    }

    renderMarker( place, index ){
        return(
            <Marker
                key={ index }
                title={ place.name }
                coordinate={{
                    latitude: place.lat,
                    longitude: place.lng
                }}
            >
                <CustomMarker/>
            </Marker>
        )
    }

    renderDesc( title, value ){
        return(
            <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', margin: 5 }}>
                <Text>{ title }</Text>
                <Text style={{ fontWeight:'bold' }}>{ value }</Text>
            </View>
        )
    }

    renderItem( { item, index} ){
        return(
            <View key={index} style={{ flex:1, backgroundColor:'#FFF', padding: 10 }}>
                <View style={{ flexDirection: 'row', padding: 10, alignItems:'flex-start'}}>
                    <Image source={{ uri: item.gambar }} style={{ height: 60, width: 60, marginRight: 10, borderColor:'grey', borderWidth:1 }}/>
                    <View style={{ flex: .9, justifyContent:'space-around', alignItems:'flex-start', marginLeft: 10 }}>
                        <Text style={{ fontWeight:'bold' }}>{ item.nama }</Text>
                        <Text>{ item.alamat }</Text>
                    </View>
                </View>
                <ScrollView>
                    { this.renderDesc( "Hari Buka", item.hari_buka )}
                    { this.renderDesc( "Jam Kerja", item.jam_kerja )}
                    { this.renderDesc( "Telepon", item.telepon )}
                    <View style={{ justifyContent:'space-around', alignItems:'flex-start', margin: 5 }}>
                        <Text style={{ fontWeight:'bold' }}>Deskripsi</Text>
                        <Text>{ item.deskripsi }</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

    render(){
        const { AccountStore, MapStore, navigator } = this.props;
        const { isLoading, places } = MapStore;
        return(
            <View style={ styles.container }>
                { this.renderNavbar( AccountStore.profile ) }
                <MapView
                    style={styles.map}
                    ref={map => this._map = map}
                    provide='google'
                    initialRegion={{
                      latitude: LATITUDE,
                      longitude: LONGITUDE,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                {
                    ( places && places.length > 0 )
                    ? places.map( this.renderMarker.bind(this) )
                    : null
                }
                </MapView>
                <View style={ styles.contentCarousel }>
                    <Carousel
                      ref={(c) => { this._carousel = c; }}
                      data={ places }
                      renderItem={ this.renderItem.bind(this) }
                      sliderWidth={ width-20 }
                      itemWidth={ width-20 }
                    />
                </View>
            </View>
        )
    }
}


const styles = {
    container: {
        flex: 1
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 90,
        backgroundColor: '#3742FA',
    },
    contentCarousel: {
         position:'absolute',
         alignItems: 'center',
         borderRadius: 5,
         left: 0,
         bottom:0,
         right:0,
         height: 250
    },
    map: {
		height: height,
		width: width,
		zIndex: -1
	},
    thumb: {
        height: 55,
        width: 55,
        borderRadius: 30
    },
    textNavbar: {
        fontSize: 14,
        color: '#FFF',
        marginVertical: 5
    }
}

export default inject( "AccountStore", "MapStore" )( observer( Map ) )
