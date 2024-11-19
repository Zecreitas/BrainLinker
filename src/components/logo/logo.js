import React, {useState, useEffect } from 'react';
import {Image, View, TouchableOpacity, Text, } from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

const Logo= () => {
  const navigation = useNavigation();

  return (
    <View>
      <Image style={styles.image}
          source={require('../../../assets/images/logo.png')}
      ></Image>
      <View>
        <TouchableOpacity style={styles.login}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cad}
          onPress={() => navigation.navigate('Tipo')}
        >
          <Text style={styles.text}>Cadastra-se</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

export default Logo;