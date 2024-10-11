import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

const Dados = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        
        if (storedToken && userId) {
          const response = await axios.get(`http://192.168.100.21:3000/api/user/${userId}`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
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
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>

      {userData ? (
        <View style={styles.profileContainer}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{userData.name}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.email}</Text>

          <Text style={styles.label}>Tipo de Usuário:</Text>
          <Text style={styles.value}>{userData.userType}</Text>

          {userData.relation && (
            <>
              <Text style={styles.label}>Relação:</Text>
              <Text style={styles.value}>{userData.relation}</Text>
            </>
          )}
        </View>
      ) : (
        <Text style={styles.errorMessage}>Não foi possível carregar os dados do usuário.</Text>
      )}
    </ScrollView>
  );
};

export default Dados;