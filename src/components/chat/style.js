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
        color: '#092845',
        fontSize: 22,
        marginTop: -5,
        marginLeft: 1,
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
      },
      nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      user: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      mensagemContainer: {
        flex: 1,
        marginBottom: 10,
      },
      balaoMensagem: {
        maxWidth: '70%',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
      },
      balaoRemetente: {
        backgroundColor: 'rgba(216, 223, 229, 100)',
        alignSelf: 'flex-end',
      },
      balaoDestinatario: {
        backgroundColor: '#092845',
        alignSelf: 'flex-start',
      },
      textoMensagem: {
        fontSize: 16,
      },
      textoRemetente: {
        color: 'black',
      },
      textoDestinatario: {
        color: 'white',
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        
      },
      input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
        backgroundColor: 'rgba(216, 223, 229, 100)',
      },
      botaoEnviar: {
        backgroundColor: '#092845',
        padding: 10,
        borderRadius: 50,
      },
      dataMensagem: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginVertical: 8,
      },
      horaMensagem: {
        fontSize: 12,
        color: '#888',
        textAlign: 'right',
      },
      voltarButton: {
        marginRight: 10,
      },
      dataContainer: {
        marginVertical: 10,
      },
      dataTitulo: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#555',
        marginVertical: 5,
        textAlign: 'center',
      },
      linhaSeparacao: {
        height: 1,
        backgroundColor: 'rgba(216, 223, 229, 100)', 
        marginVertical: 10, 
      },
});

export default styles