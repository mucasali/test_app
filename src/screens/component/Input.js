import React from 'react'
import {View, Text, TextInput, Platform, Modal, DatePickerAndroid, TouchableOpacity} from 'react-native'
import moment from 'moment'

import Config from '../../config'
import DatePickerIOS from './input/DatePicker'
import CheckBox from './input/CheckBox'

const OS = Platform.OS;

const styles = {
    container: {
        marginVertical: OS == 'ios' ? 2 : 5
    },
    title: {
        color: Config.color.secondText,
        fontSize: 12
    },
    input: {
        height: 40,
        margin:2,
        padding:10,
        paddingVertical: Platform.OS == 'ios' ? 12 : 0,
        borderColor:'#CFD0D0',
        borderWidth:1,
        borderRadius: 30,
        justifyContent: 'center'
    },
    checkbox: {
        height:40,
        margin:2,
        padding:10,
        paddingVertical: Platform.OS == 'ios' ? 12 : 0,
        justifyContent: 'center'
    },
    textError: {
        textAlign: 'left',
        fontSize: 10,
        color: 'red',
        paddingHorizontal: 5
    }
}

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
                    placeholder={title}
                    placeholderTextColor={Config.color.secondText}
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
    value: "",
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
    maxDate,
    textColor,
    labelColor,
    styleInput
}) => {
    const showError = error && error.length > 0 ? true : false;
    console.log('Component.DatePicker ', maxDate, title, error, "-0", showError)
    let refDate = null;

    const openDateAndroid = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(),
                maxDate: maxDate
            });
            console.log('action ', action)
            if (action !== DatePickerAndroid.dismissedAction) {
                setFieldValue(name, year+"-"+(month+1)+"-"+day)
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    return(
        <View style={styles.container}>
            {
                label ? <Text style={styles.title}>{title}</Text> : null
            }
            <View style={styleInput}>
                {
                    OS == 'ios'
                    ?   <DatePickerIOS
                            ref={ref => { refDate = ref }}
                            maxDate={maxDate}
                            onDateChange={ (date) => {
                                setFieldValue(name, moment(date).format("YYYY-MM-DD"))
                            } }
                        />
                    :   null
                }
                <TouchableOpacity
                    onPress={()=>{
                        OS == 'ios'
                        ?   refDate.showModal()
                        :   openDateAndroid()
                    }}
                >
                    {
                        value
                        ?   <Text >{value}</Text>
                        :   <Text style={styles.title}>{title}</Text>
                    }
                </TouchableOpacity>
            </View>
            { showError ? <Text style={styles.textError} >{error}</Text> : <Text />}
        </View>
    )
}

DatePicker.defaultProps = {
    label: false,
    title: "",
    name: "",
    value: "",
    error: "",
    maxDate: moment().subtract(17, 'y').toDate(),
    setFieldValue: ()=>{},
    setFieldTouched: () => {},
    labelColor: '#FFF5',
    textColor: '#000',
    styleInput: styles.input
}

const CheckBoxs = ({
    label,
    title,
    name,
    value,
    error,
    data,
    maxSelected,
    setFieldValue,
    setFieldTouched,
    textColor,
    labelColor,
    styleInput
}) => {
    const showError = error && error.length > 0 ? true : false;
    console.log('Component.DatePicker ', title, error, "-0", showError)
    let refDate = null;

    return(
        <View style={styles.container}>
            {
                label ? <Text style={styles.title}>{title}</Text> : null
            }
            <View style={styleInput}>
                <CheckBox
                    data={data}
                    maxSelected={maxSelected}
                    onPress={ (arrSelected) => {
                        if(arrSelected != null && arrSelected.length > 0){
                            setFieldValue(name, arrSelected)
                        }
                        setFieldTouched(name, true)
                    }}
                    styleText={{color: Config.color.secondText}}
                    colorSelected={Config.color.secondBackground}
                    colorDiselected={Config.color.secondText}
                />
            </View>
            { showError ? <Text style={styles.textError} >{error}</Text> : <Text />}
        </View>
    )
}

CheckBoxs.defaultProps = {
    label: false,
    title: "",
    name: "",
    value: "",
    error: "",
    data: [],
    maxSelected: 1,
    setFieldValue: ()=>{},
    setFieldTouched: () => {},
    labelColor: '#FFF5',
    textColor: '#000',
    styleInput: styles.checkbox
}

export {Input, DatePicker, CheckBoxs};
