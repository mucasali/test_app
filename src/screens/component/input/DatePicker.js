import React, {Component} from 'react'
import {Modal, View, DatePickerIOS, TouchableOpacity} from 'react-native'

export default class DatePicker extends Component{

    constructor(props){
        super(props)
        this.state = {
            show: false,
            chooseDate: new Date()
        }
    }

    showModal(){
        this.setState({show: true})
    }

    hideModal(){
        this.setState({show: false})
    }

    render(){
        const {date, maxDate, onDateChange } = this.props;
        return(
            <Modal
                style={{flex:1}}
                animationType="slide"
                transparent={false}
                visible={this.state.show}
            >
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => {
                        onDateChange(this.state.chooseDate)
                        this.hideModal()
                    }}
                >
                    <DatePickerIOS
                         date={this.state.chooseDate}
                         maximumDate={maxDate}
                         mode='date'
                         onDateChange={ date => {
                             console.log('chooseDate ', date)
                             this.setState({chooseDate: date})
                         }}
                    />
            </TouchableOpacity>
            </Modal>
        )
    }
}

DatePicker.defaultProps = {
    date: new Date(),
    maxDate: new Date(),
    onDateChange: () => {}
}

const styles = {
    container: {
        flex:1,
        justifyContent:'center'
    }
}
