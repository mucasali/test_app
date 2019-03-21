import React from 'react'
import {View, Text, TextInput, Platform, DatePickerAndroid, DatePickerIOS} from 'react-native'

import Config from '../../../config'
import styles from './Styles'

const OS = Platform.OS;

const Input = ({
    label,
    title,
    name,
    value,
    error,
    setFieldValue,
    setFieldTouched,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
    textColor,
    labelColor,
    styleInput
}) => {
    const showError = error && error.length > 0 ? true : false;
    console.log('Component.Input ', title, secureTextEntry, keyboardType, autoCapitalize, error, "-0", showError)
    return(
        <View style={styles.container}>
            {
                label ? <Text style={styles.title}>{title}</Text> : null
            }
            <View style={styleInput}>
                <TextInput
                    placeholder={title}styleInput
                    secureTextEntry={secureTextEntry}
                    name={name}
                    value={value}
                    keyboardType={keyboardType}
                    onChangeText={ (text) => {
                        if(text != null){
                            setFieldValue(name, text)
                        }
                        setFieldTouched(name, true)
                    }}
                    autoCapitalize={autoCapitalize}
                    style={{color: textColor}}
                />
            </View>
            { showError ? <Text style={styles.textError} >{error}</Text> : <Text />}
        </View>
    )
}

Input.defaultProps = {
    label: false,
    title: "",
    name: "",
    values: "",
    error: "",
    secureTextEntry: false,
    setFieldValue: ()=>{},
    setFieldTouched: () => {},
    keyboardType: 'default',
    autoCapitalize: 'sentences',
    labelColor: '#FFF5',
    textColor: '#000',
    styleInput: styles.input
}


const DatePicker = ({
    label,
    title,
    name,
    value,
    error,
    setFieldValue,
    setFieldTouched,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
    textColor,
    labelColor,
    styleInput
}) => {
    const showError = error && error.length > 0 ? true : false;
    console.log('Component.DatePicker ', title, secureTextEntry, keyboardType, autoCapitalize, error, "-0", showError)
    return(
        <View style={styles.container}>
            {
                label ? <Text style={styles.title}>{title}</Text> : null
            }
            <View style={styleInput}>
                {
                    OS == 'ios'
                    ? <DatePickerIOS
                        date={new Date()}
                        />
                    : <DatePickerAndroid />
                }
            </View>
            { showError ? <Text style={styles.textError} >{error}</Text> : <Text />}
        </View>
    )
}

DatePicker.defaultProps = {
    label: false,
    title: "",
    name: "",
    values: "",
    error: "",
    secureTextEntry: false,
    setFieldValue: ()=>{},
    setFieldTouched: () => {},
    keyboardType: 'default',
    autoCapitalize: 'sentences',
    labelColor: '#FFF5',
    textColor: '#000',
    styleInput: styles.input
}


export {Input, DatePicker};
