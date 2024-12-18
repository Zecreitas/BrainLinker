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
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          
          elevation: 7,
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
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          
          elevation: 7,
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
        midiaInfoContainer: {
          position: 'absolute',
          top: 10,
          left: 10,
          right: 10,
          justifyContent: 'space-between',
        },
        senderName: {
          color: '#092845',
          fontWeight: 'bold',
          fontSize: 20,
          margin: 8,

        },
        senderDetails: {
          flexDirection: 'row',
        },
        senderRelation: {
          color: '#0F3AB5',
          marginRight: 10,
          fontWeight: 'bold',
          fontSize: 16,
          marginLeft: 8,
        },
        senderAge: {
          color: '#0F3AB5',
          fontWeight: 'bold',
          fontSize: 16,
          marginLeft: -6,
        },
        sendTime: {
          color: '#0F3AB5',
          position: 'absolute',
          top: 10,
          right: 10,
          fontSize: 15,
          fontWeight: 'bold',
        },
        midiaDescription: {
          padding: 10,
          fontSize: 18,
          fontWeight: 'medium',
          alignSelf: 'justify',
          marginVertical: 10,
        },
        contatosContainer: {
          padding: 10,
          alignItems: 'stretch',
        },
        contatoCard: {
          alignSelf: 'stretch', 
          backgroundColor: '#ffffff',
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
          marginHorizontal: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        },
        contatoNome: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#092845',
        },
        contatoInfo: {
          fontSize: 14,
          color: '#666666',
        },
        semContatos: {
          textAlign: 'center',
          fontSize: 16,
          color: '#999999',
          marginTop: 20,
        },
        ultimaMensagem: {
          fontSize: 14,
          color: '#555',
          marginTop: 4,
        },
        dataMensagem: {
          fontSize: 12,
          color: '#888',
          marginTop: 2,
        },
  });

  export default styles