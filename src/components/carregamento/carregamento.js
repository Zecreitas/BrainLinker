import React, { useEffect } from 'react';
import { Image, View, Alert } from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { useNavigation } from '@react-navigation/native';

const Carregamento = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        
        if (token && user) {
          const decoded = jwtDecode(token);

          // Verificar a data de expiração do token
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            Alert.alert('Erro', 'O token expirou. Por favor, faça login novamente.');
            navigation.navigate('Logo');
          } else {
            
            navigation.navigate('Connect', { token });
          }
        } else {
          navigation.navigate('Logo');
        }
      } catch (error) {
        console.log('Erro ao verificar o login:', error);
        navigation.navigate('Logo');
      }
    };

    checkLogin();
  }, [navigation]);

  return (
    <View>
      <Image style={styles.image} source={require('../../../assets/images/logo.png')} />
    </View>
  );
};

export default Carregamento;