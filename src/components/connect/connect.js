import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const Connect = () => {
  const navigation = useNavigation();
  const [emailCuidador, setEmailCuidador] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState(''); 
  const [destinatarioId, setDestinatarioId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getTokenAndUserId = async () => {
      await AsyncStorage.multiRemove(['remetenteId', 'destinatarioId', 'emailCuidador']);
      
      const storedToken = await AsyncStorage.getItem('token');
      const storedUserId = await AsyncStorage.getItem('userId');
      setToken(storedToken || '');
      setUserId(storedUserId || '');
    };
    getTokenAndUserId();
  }, []);
  
  const conectar = async () => {
    try {
      if (!token) {
        setErrorMessage('Usuário não autenticado. Por favor, faça login novamente.');
        return;
      }

      const response = await fetch('http://192.168.100.21:3000/api/conectar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ emailCuidador }),
      });

      const result = await response.json();
      if (response.ok) {
        if (result.conexoes && result.conexoes.length > 0) {
          const connectionId = result.conexoes[result.conexoes.length - 1];

          if (userId && connectionId) {
            await AsyncStorage.setItem('remetenteId', userId);
            await AsyncStorage.setItem('destinatarioId', connectionId);
            await AsyncStorage.setItem('emailCuidador', emailCuidador); 

            setErrorMessage('');
            navigation.navigate('Inicio', { token, remetenteId: userId, destinatarioId: connectionId });
          } else {
            setErrorMessage('Não foi possível salvar os IDs de remetente e destinatário.');
          }
        }
      } else if (result.message === 'Já está conectado com este cuidador') {
        setErrorMessage('');
        const remetenteId = await AsyncStorage.getItem('userId');
        const connectionId = await AsyncStorage.getItem('destinatarioId');

        navigation.navigate('Inicio', { token, remetenteId, destinatarioId: connectionId });
      } else {
        setErrorMessage(result.message || 'Ocorreu um erro inesperado.');
      }
    } catch (error) {
      console.error('Erro na conexão:', error);
      setErrorMessage('Não foi possível conectar. Verifique sua conexão e tente novamente.');
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

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

export default Connect;
