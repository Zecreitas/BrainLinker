import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const Tipo = () => {
  const navigation = useNavigation();

  const handleTipo = (tipo) => {
    if (tipo === 'cuidador') {
      navigation.navigate('Cad', { userType: 'cuidador' });
    } else {
      navigation.navigate('Relacao', { userType: 'familiar/amigo' });
    }
  };

  return (
    <View>
      <View>
        <Image style={styles.image} source={require('../../../assets/images/logo.png')} />
        <Text style={styles.texto}>Qual sua relação com o paciente?</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handleTipo('cuidador')}>
          <Image style={styles.cui} source={require('../../../assets/images/cuidador.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTipo('familiar/amigo')}>
          <Image style={styles.cui} source={require('../../../assets/images/familiar.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.cuidador}>Cuidador</Text>
        <Text style={styles.amigo}>Familiar/Amigo</Text>
      </View>
    </View>
  );
};

export default Tipo;
