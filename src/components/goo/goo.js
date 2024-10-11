import React from 'react';
import {Image, View, TouchableOpacity, Text, TextInput} from 'react-native';
import styles from './style';

import { useNavigation} from '@react-navigation/native';


const Logo= () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity style={styles.cad}
      onPress={() => navigation.navigate('Tipo')} 
      >
          <Text style={styles.tcad}>Ainda Não se Cadastrou? Então <Text style={styles.textoCad}>Cadastre-se</Text></Text>
        </TouchableOpacity>
    </View>
  );
};

export default Logo;