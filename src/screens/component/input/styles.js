
const styles = {
    container: {

    },
    title: {
        color: Config.color.secondText,
        fontSize: 12
    },
    input: {
        height: 50,
        margin:3,
        padding:10,
        paddingVertical: Platform.OS == 'ios' ? 8: 5,
        borderColor:'#CFD0D0',
        borderWidth:1,
        borderRadius: 30,
        justifyContent: 'center'
    },
    textError: {
        textAlign: 'left',
        fontSize: 10,
        color: 'red',
        paddingHorizontal: 5
    }
}

export default styles;
