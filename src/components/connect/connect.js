import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import { useNavigation, useRoute } from '@react-navigation/native';

const Connect = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [emailCuidador, setEmailCuidador] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    if (route.params?.token) {
      setToken(route.params.token);
    } else {
      AsyncStorage.getItem('token').then(storedToken => {
        setToken(storedToken || '');
      });
    }
  }, [route.params?.token]);

  const conectar = async () => {
    try {
      if (!token) {
        Alert.alert('Erro', 'Usuário não autenticado. Por favor, faça login novamente.');
        return;
      }
  
      const response = await fetch('http://192.168.100.21:3000/api/conectar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ emailCuidador })
      });
  
      const result = await response.json();

  
      if (response.ok) {
        Alert.alert('Conectado com sucesso!', `ID da conexão: ${result.conexoes}`);
        
        // Armazene as conexões no AsyncStorage
        await AsyncStorage.setItem('connectionId', JSON.stringify(result.conexoes[0]));
  
        navigation.navigate('Inicio', { token });
      } else {
        Alert.alert('Erro ao conectar', result.message || 'Ocorreu um erro inesperado.');
        if (result.message === 'Já está conectado com este cuidador') {
          navigation.navigate('Inicio', { token });
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar. Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <View>
      <Image style={styles.image} source={require('../../../assets/images/logo.png')} />
      <Text style={styles.texto}>Busque o cuidador pelo email dele</Text>
      <View style={styles.formInput}>
        <TextInput
          style={styles.inputText}
          placeholder="Digite o Email Aqui..."
          value={emailCuidador}
          onChangeText={setEmailCuidador}
          placeholderTextColor={'white'}
        />
      </View>
      <TouchableOpacity onPress={conectar} style={styles.buttonPesq}>
        <Text style={styles.text}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Connect;
