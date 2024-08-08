import React, {useState, useEffect } from 'react';
import {Image, View, TouchableOpacity, Text, } from 'react-native';
import styles from './style';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useNavigation} from '@react-navigation/native';

const Carregamento = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLogin = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user');

            if (token && user) {
                // Existe token e usuário, navegue para a tela inicial
                navigation.navigate('Inicio');
            } else {
                // Não há token ou usuário, navegue para a tela de login
                navigation.navigate('Logo');
            }
        } catch (error) {
            console.log('Erro ao verificar o login:', error);
        }
    };

    checkLogin();
}, []);


  return (
    <View>
      <Image style={styles.image}
          source={require('../../../assets/images/logo.png')}
      ></Image>
    </View>
    
  );
};

export default Carregamento;