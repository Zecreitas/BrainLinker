import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    imagemSelec: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 3,
        borderColor: '#092845',
        
    },
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
        backgroundColor: '#092845',
        padding: 15,
        borderRadius: 100,
        marginVertical: 10,
        width: 90,
        height: 90,
        alignItems: 'center',
        shadowColor: "#000",
        shadowColor: "#000",
      },
      botaoTexto: {
        color: 'white',
        fontWeight: 'bold',
      },
      botaoEnviar: {
        backgroundColor: '#092845',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: 150,
        alignItems: 'center',
        marginBottom: 50,
        
      },
      botaoTextoEnviar: {
        color: 'white',
        fontWeight: 'bold',
      },
      botaoVoltar: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
        
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
        backgroundColor: 'rgba(216, 223, 229, 100)',
        padding: 10,
        borderRadius: 20,
        marginVertical: 15,
        width: '85%',
        alignSelf: 'center',
        paddingBottom: 30,
        paddingTop: 100,
        marginBottom: 40,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
      },
      midiaDescription: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'medium',
        alignSelf: 'center',
        marginVertical: 10,
      },
      container: {
        marginBottom: 50,
      },
      selecText: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'medium',
        alignSelf: 'center',
        marginVertical: 10,
        marginTop: 20
      },
      selecionada: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'medium',
        alignSelf: 'center',
        marginVertical: 10,
        marginTop: 20,
        
      },
      textDesc: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'medium',
        alignSelf: 'justify',
        marginVertical: 10,
        marginTop: 20
      },
      input: {
        backgroundColor: 'rgba(216, 223, 229, 100)',
        borderRadius: 10,
        width: '80%',
        height: 40,
        alignSelf: 'center',
        marginBottom: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    textEnvi: {
        color: 'rgba(15, 58, 181, 100)',
        fontSize: 25,
        fontWeight: 'medium',
        alignSelf: 'center',
        marginVertical: 10,
        marginTop: 10,
        marginBottom: 10,
      },
});

export default styles