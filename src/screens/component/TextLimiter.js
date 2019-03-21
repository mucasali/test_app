import React, {Component} from 'react'
import {Text, View} from 'react-native'

const LIMIT = 100;

export class TextLimiter extends Component{

    state = {
        expand : false
    }

    render(){
        const {text, textLimiter, textExpander, styleText, styleTextLimiter, limit} = this.props;

        if(!text){return null}

        const limitText = limit ? limit : LIMIT;
        const textLimited = (text.length > limitText);
        const limited = !this.state.expand &&  textLimited ? true : false;
        const textShow = limited ? text.substring(0,limitText) : text;

        return(
            <View style={{flex:1, height:50, paddingHorizontal:5}}>
                <Text style={styleText}>{text}</Text>
                <Text style={styleText}>
                    {
                        limited
                        ? <Text
                            style={styleTextLimiter}
                            onPress={()=>{
                                this.setState({expand: true})
                            }}
                          >
                            ... {textExpander}
                          </Text>
                        : <Text
                            style={styleTextLimiter}
                            onPress={()=>{
                                this.setState({expand: false})
                            }}
                          >
                             {textLimited ? textLimiter : ""}
                          </Text>
                      }
                </Text>
            </View>

        )
    }
}

TextLimiter.defaultProps = {
    text: "",
    textLimiter: "show less",
    textExpander: "show more",
    styleText: {},
    styleTextLimiter: {},
    limit: LIMIT
}
