import React from 'react';
import {Image, View, TouchableOpacity, Text, TextInput} from 'react-native';
import styles from './style';

import { useNavigation} from '@react-navigation/native';


const Logo= () => {
  const navigation = useNavigation();
  return (
    <View>
      <View>
        <Text style={styles.text}>Ou faça login pelo Google</Text>
        <TouchableOpacity>
          <Image style={styles.image} source={require('../../../assets/images/google.png')} />
        </TouchableOpacity>
        <Text style={styles.text}>Esqueceu sua senha? Recupere Aqui!</Text>
      </View>
      <TouchableOpacity style={styles.cad}
      onPress={() => navigation.navigate('Tipo')} 
      >
          <Text style={styles.tcad}>Ainda Não se Cadastrou? Então Cadastre-se</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Logo;