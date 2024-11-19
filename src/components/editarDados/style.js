import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
      },
      profileContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
      },
      label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
      },
      value: {
        fontSize: 18,
        color: '#092845',
        marginBottom: 15,
        fontWeight: 'bold',
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      errorMessage: {
        color: 'red',
        textAlign: 'center',
      },
      title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      errorMessage: {
        color: 'red',
        textAlign: 'center',
      },
      backButton: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
      },
      copiedMessage: {
        color: 'green',
        marginTop: 10,
        fontSize: 14,
      },
      input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#092845',
        fontWeight: 'bold',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
      },
      button: {
        backgroundColor: '#092845',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        marginTop: 30
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
      },
});

export default styles;
