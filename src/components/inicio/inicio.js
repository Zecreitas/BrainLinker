import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Midia from '../midia/midia';
import Mensagens from '../mensagens/mensagens';
import Agenda from '../agenda/agenda';
import styles from './style';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#092845', height: 55 },
        tabBarActiveTintColor: 'white',
      }}>
      <Tab.Screen
        name="Início"
        component={Inicio}
        options={{
          tabBarLabel: 'Início',
          tabBarInactiveTintColor: 'white',
          tabBarActiveTintColor: '#06C8F2',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={40} marginTop={1.5} />
          ),
        }}
      />
      <Tab.Screen
        name="Mídia"
        component={Midia}
        options={{
          tabBarLabel: 'Mídia',
          tabBarInactiveTintColor: 'white',
          tabBarActiveTintColor: '#06C8F2',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={38} marginTop={3} />
          ),
        }}
      />
      <Tab.Screen
        name="Mensagens"
        component={Mensagens}
        options={{
          tabBarLabel: 'Mensagens',
          tabBarInactiveTintColor: 'white',
          tabBarActiveTintColor: '#06C8F2',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message" color={color} size={35} marginTop={3.5} />
          ),
        }}
      />
      <Tab.Screen
        name="Agenda"
        component={Agenda}
        options={{
          tabBarLabel: 'Agenda',
          tabBarInactiveTintColor: 'white',
          tabBarActiveTintColor: '#06C8F2',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={35} marginTop={3.5} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Inicio = () => {
  const [midias, setMidias] = useState([]);
  const [token, setToken] = useState('');
  const [connectionId, setConnectionId] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedConnectionId = await AsyncStorage.getItem('connectionId');

        if (storedToken && storedConnectionId) {
          setToken(storedToken);
          setConnectionId(storedConnectionId);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    carregarDados();
  }, []);

  useEffect(() => {
    if (token && connectionId) {
      carregarMidias();
    }
  }, [token, connectionId]);
  const carregarMidias = async () => {
    try {
      // está recebendo o connectionid com aspas, essa const tira elas
      const cleanedConnectionId = connectionId.replace(/"/g, '');
      
      const response = await axios.get(`http://192.168.100.21:3000/api/midias/${cleanedConnectionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
  
      if (response.status === 200) {
        setMidias(response.data);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar as mídias');
      }
    } catch (error) {
      console.error('Erro ao carregar as mídias:', error);
      Alert.alert('Erro', 'Não foi possível carregar as mídias');
    }
  };

  return (
    <View>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.user}>
          <MaterialCommunityIcons name="account-circle" color="white" size={44} />
          <Text style={styles.userText}>Usuário</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {midias.length > 0 ? (
          midias.map((midia) => (
            <View key={midia._id} style={styles.midiaContainer}>
              <Image source={{ uri: `http://192.168.100.21:3000/${midia.caminho}` }} style={styles.midiaImage} />
              {/* recebo o caminho certo mas a imagem não aparece, postman funciona, tenho que ver o que pode ter de errado */}
              <Text style={styles.midiaDescription}>{midia.descricao}</Text>
              <Text style={styles.midiaDate}>{midia.tipo}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noMidiaText}>Nenhuma mídia disponível</Text>
          // não sei se é a minha internet que cai mas as vezses não retorna midia e da erro axiosnetwork
        )}
      </ScrollView>
    </View>
  );
};

export default MyTabs;
