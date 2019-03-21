import React, {Component} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class CheckBox extends Component{

    constructor(props){
        super(props)
        this.state = {
            // selected: { 0 : "Male"}
            selected: []
        }
    }

    onSelected(item){
        const selected = this.state.selected[item.key]
        if(selected){

        }
    }

    renderItem(item, index){
        const {colorSelected, colorDiselected, styleText, maxSelected, onPress} = this.props
        const select = this.state.selected;
        const selected = select[item.key]
        return(
            <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={()=> {
                    if(selected){
                        delete select[item.key]
                    }else{
                        const keys = Object.keys(select);
                        if(keys.length >= maxSelected){
                            const key = keys[(keys.length-1)]
                            delete select[key];
                        }
                        select[item.key] = item.title
                    }
                    onPress(Object.keys(select))
                    this.setState({selected: select})
                }}
            >
                <Icon
                    size={18}
                    name={ selected ? "check-square" : "square-o"}
                    color={ selected ? colorSelected : colorDiselected }
                />
                <Text style={[styles.text, styleText]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                {
                    this.props.data.map(this.renderItem.bind(this))
                }
            </View>

        )
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        justifyContent:'flex-start'
    },
    item: {
        marginHorizontal:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    text: {
        marginLeft: 10
    }
}

CheckBox.defaultProps = {
    data: [],
    maxSelected: 1,
    onPress: () => {},
    colorSelected: 'blue',
    colorDiselected: 'grey',
    styleText: styles.text
}
