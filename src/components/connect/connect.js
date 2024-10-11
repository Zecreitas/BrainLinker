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
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagem de erro

  // Obtém o token e o userId do AsyncStorage
  useEffect(() => {
    const getTokenAndUserId = async () => {
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
      console.log('API Response:', result);

      if (response.ok) {
        if (result.conexoes && result.conexoes.length > 0) {
          const connectionId = result.conexoes[result.conexoes.length - 1];
          console.log('Connection ID:', connectionId);
          console.log('Remetente ID (userId):', userId);

          if (userId && connectionId) {
            // Salva os IDs no AsyncStorage
            await AsyncStorage.setItem('remetenteId', userId);
            await AsyncStorage.setItem('destinatarioId', connectionId);
            await AsyncStorage.setItem('emailCuidador', emailCuidador); 
            console.log('Remetente e destinatário salvos:', userId, connectionId);

            setErrorMessage(''); // Limpa a mensagem de erro ao conectar com sucesso
            navigation.navigate('Inicio', { token, remetenteId: userId, destinatarioId: connectionId });
          } else {
            setErrorMessage('Não foi possível salvar os IDs de remetente e destinatário.');
          }
        }
      } else if (result.message === 'Já está conectado com este cuidador') {
        setErrorMessage('');
        const remetenteId = await AsyncStorage.getItem('userId');
        const connectionId = await AsyncStorage.getItem('destinatarioId');
        console.log('Remetente e destinatário recuperados:', remetenteId, connectionId);

        // Navega para a próxima tela com os IDs
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

      {/* Exibe mensagem de erro em vermelho, se houver */}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

export default Connect;