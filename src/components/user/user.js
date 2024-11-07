import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './style';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Clipboard } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const User = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedMessage, setCopiedMessage] = useState('');
  const navigation = useNavigation(); 

  const carregarDadosUsuario = async () => {
    setLoading(true);
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

  useFocusEffect(
    React.useCallback(() => {
      carregarDadosUsuario();
    }, [])
  );

  const copyToClipboard = (email) => {
    Clipboard.setString(email);
    setCopiedMessage('Email copiado!'); 
    setTimeout(() => setCopiedMessage(''), 2000); 
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userType');

    setUserData(null);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
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
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarButton}>
        <MaterialCommunityIcons name="arrow-left" size={30} color="black" style={{ marginTop: 5 }} />
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

          <TouchableOpacity onPress={() => navigation.navigate('Letra')}>
            <Text style={styles.label}>Tamanho das letras</Text>
            <Text style={styles.value}>100%</Text>
          </TouchableOpacity>
          
          {copiedMessage ? <Text style={styles.copiedMessage}>{copiedMessage}</Text> : null}
        </View>
      ) : (
        <Text style={styles.errorMessage}>Não foi possível carregar os dados do usuário.</Text>
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logout}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default User;
