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

      sectionTitle: {
        fontSize: 24,
        color: '#092845',
        fontWeight: 'bold',
        marginBottom: 15,
        alignSelf: 'center',
        marginTop: 15,
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
      mensagemCard: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'rgba(216, 223, 229, 100)',
        padding: 10,
        borderRadius: 20,
        marginVertical: 15,
        width: '85%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
      },
      mensagemTexto: {
        color: 'black',
        fontSize: 16,
        marginLeft: 5,
      },
      mensagemInfo: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 5,
      },
      mensPass: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
        marginLeft: 5,
        alignSelf: 'flex-start',
      },
});

export default styles