import React, { useEffect } from 'react';
import { Image, View, Alert } from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { useNavigation } from '@react-navigation/native';

const Carregamento = () => {
  const navigation = useNavigation();

  const conectarAutomaticamente = async (token, userId, emailCuidador) => {
    try {
      console.log('Email do Cuidador:', emailCuidador);
      const response = await fetch('http://192.168.100.21:3000/api/conectar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ emailCuidador }),
      });
  
      const result = await response.json();
      console.log('Resposta da conexão automática:', result);
  
      if (response.ok) {
        const connectionId = result.conexoes[result.conexoes.length - 1]; 
        console.log('Conexão automática bem-sucedida:', connectionId);
        
        await AsyncStorage.setItem('remetenteId', userId);
        await AsyncStorage.setItem('destinatarioId', connectionId);
        
        navigation.navigate('Inicio', { token, remetenteId: userId, destinatarioId: connectionId });
      } else if (result.message === 'Já está conectado com este cuidador') {
        // Se já está conectado, simplesmente navegue para a tela de início
        const connectionId = await AsyncStorage.getItem('destinatarioId');
        await AsyncStorage.setItem('remetenteId', userId);
        console.log('Conexão já existe, navega para a tela de início com o ID:', connectionId);
        navigation.navigate('Inicio', { token, remetenteId: userId, destinatarioId: connectionId });
      } else {
        console.error('Erro na conexão automática:', result.message);
        Alert.alert('Erro ao conectar', result.message || 'Ocorreu um erro inesperado.');
        navigation.navigate('Connect', { token, userId });
      }
    } catch (error) {
      console.error('Erro na conexão automática:', error);
      Alert.alert('Erro', 'Não foi possível conectar automaticamente. Verifique sua conexão e tente novamente.');
      navigation.navigate('Connect', { token, userId });
    }
  };
  

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');

        if (token && user) {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            Alert.alert('Erro', 'O token expirou. Por favor, faça login novamente.');
            navigation.navigate('Logo');
          } else {
            const userId = decoded.user.id;
            await AsyncStorage.setItem('userId', userId);
            
            const emailCuidador = await AsyncStorage.getItem('emailCuidador');
            if (emailCuidador) { 
              console.log('Email do Cuidador:', emailCuidador);
              await conectarAutomaticamente(token, userId, emailCuidador); // Passando emailCuidador aqui
            } else {
              navigation.navigate('Connect', { token, userId });
            }
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