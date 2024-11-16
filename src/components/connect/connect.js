import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Connect = () => {
  const navigation = useNavigation();
  const [emailCuidador, setEmailCuidador] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
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
  
      const conexoesResponse = await fetch(`http://192.168.100.21:3000/api/usuario/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const conexoesData = await conexoesResponse.json();
  
      if (conexoesResponse.ok && conexoesData && conexoesData.connections) {
        const existingConnection = conexoesData.connections.find(conn => conn.email === emailCuidador);
  
        if (existingConnection) {
          await AsyncStorage.setItem('remetenteId', userId);
          await AsyncStorage.setItem('destinatarioId', existingConnection._id);
          await AsyncStorage.setItem('emailCuidador', emailCuidador);
          
          navigation.navigate('Inicio', { token, remetenteId: userId, destinatarioId: existingConnection._id });
          return;
        }
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
  
      if (response.ok && result.connectionId) {
        await AsyncStorage.setItem('remetenteId', userId);
        await AsyncStorage.setItem('destinatarioId', result.connectionId);
        await AsyncStorage.setItem('emailCuidador', emailCuidador);
  
        setErrorMessage('');
        navigation.navigate('Inicio', { token, remetenteId: userId, destinatarioId: result.connectionId });
      } else {
        setErrorMessage(result.message || 'Erro ao conectar com o cuidador.');
      }
    } catch (error) {
      console.error('Erro na conexão:', error);
      setErrorMessage('Não foi possível conectar. Verifique sua conexão e tente novamente.');
    }
  }; 
  

  return (
    <View>
      <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
      </TouchableOpacity>
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