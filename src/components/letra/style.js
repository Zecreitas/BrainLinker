import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voltarButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#092845',
  },
  slider: {
    width: '80%',
    marginVertical: 30,
  },
  tamanhoExemplo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
  },
});

export default styles;
