import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    image: {
        width: 280,
        height: 280,
        alignSelf: 'center',
        marginBottom: -50
    },
    login:{
        backgroundColor: "#092845",
        width: 160,
        height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 18
    },
    text:{
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto:{
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 40,
        marginTop: 20,
    },
    formInput:{
        flexDirection: 'row',
        backgroundColor: '#092845',
        borderRadius: 50,
        height: 42,
        width: '88%',
        alignSelf: 'center',
    },
    toggle: {
        alignSelf: 'center',
    },
    inputText: {    
        color: 'white',
        fontSize: 16,
        paddingLeft: 20,
        width: '90%',
        paddingRight: 10,
        alignContent: 'center',
        color: 'white',
    },
    error: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16
    },
});

export default styles