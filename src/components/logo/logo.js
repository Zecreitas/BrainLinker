import React, {useState, useEffect } from 'react';
import {Image, View, TouchableOpacity, Text, } from 'react-native';
import styles from './style';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useNavigation} from '@react-navigation/native';

const Logo= () => {
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
                navigation.navigate('Login');
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