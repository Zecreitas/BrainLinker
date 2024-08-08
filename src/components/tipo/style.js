import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 280,
    alignSelf: 'center',
    marginBottom: -50,
  },
  texto: {
    color: 'black',
    fontSize: 25,
    justifyContent: 'justify',
    alignSelf: 'center',
    margin: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  containerText: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  cui: {
    backgroundColor: '#092845',
    width: 150,
    height: 150,
    alignItems: 'center',
    margin: 12,
    borderRadius: 100,
  },
  cuidador: {
    marginTop: 160,
    marginLeft: 70,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  amigo: {
    marginTop: 160,
    marginLeft: 45,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default styles;
