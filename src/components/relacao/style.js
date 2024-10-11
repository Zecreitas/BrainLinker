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
        fontSize: 20,
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
        backgroundColor: '#092845',
        borderRadius: 50,
        height: 42,
        width: '88%',
        paddingLeft: 20,
        paddingRight: 20,
        color: 'white',
        alignContent: 'center',
        alignSelf: 'center',
        fontSize: 15,
    },
    error: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
    },
});

export default styles