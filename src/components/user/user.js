import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './style';
import Dados from '../dados/dados';
import { useNavigation } from '@react-navigation/native';
import { Clipboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const User = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedMessage, setCopiedMessage] = useState('');
  const navigation = useNavigation(); 

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        
        if (storedToken && userId) {
          const response = await axios.get(`http://192.168.100.21:3000/api/user/${userId}`, {
            headers: { 'Authorization': `Bearer ${storedToken}` },
          });
          if (response.status === 200) {
            setUserData(response.data);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarDadosUsuario();
  }, []);

  const copyToClipboard = (email) => {
    Clipboard.setString(email);
    setCopiedMessage('Email copiado!'); 
    setTimeout(() => setCopiedMessage(''), 2000); 
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#06C8F2" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Conta</Text>
      {userData ? (
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Dados')}>
            <Text style={styles.label}>Informações Sobre a Conta</Text>
            <Text style={styles.value}>{userData.name}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => copyToClipboard('brainlinker06@gmail.com')}>
            <Text style={styles.label}>Contato</Text>
            <Text style={styles.value}>brainlinker06@gmail.com</Text>
          </TouchableOpacity>
          {copiedMessage ? <Text style={styles.copiedMessage}>{copiedMessage}</Text> : null}
        </View>
      ) : (
        <Text style={styles.errorMessage}>Não foi possível carregar os dados do usuário.</Text>
      )}
    </ScrollView>
  );
};

export default User;