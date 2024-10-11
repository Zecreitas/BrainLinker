import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    nav: {
        width: '100%',
        height: 60,
        backgroundColor: '#092845',
    },
    user: {
        alignSelf: 'center',
        marginLeft: 340,
        marginTop: 0.5,
    },
    userText: {
        color: 'white',
        fontSize: 12,
        marginTop: -5,
        marginLeft: 1,
    },
    botao: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
      },
      botaoTexto: {
        color: 'white',
        fontWeight: 'bold',
      },
      midiaImage: {
        width: 300,
        height: 200,
        borderColor: '#092845',
        borderWidth: 3,
        marginVertical: 10,
 
      },
      midiaCard: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(17, 25, 32, 0.21)',
        padding: 10,
        borderRadius: 20,
        marginVertical: 15,
        width: '85%',
        alignSelf: 'center',
        paddingBottom: 30,
        paddingTop: 100,
        marginBottom: 40,
        shadowColor: "#000",
      },
      midiaDescription: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'medium',
        alignSelf: 'center',
        marginVertical: 10,
      },
      container: {
        marginBottom: 50,
      },
});

export default styles