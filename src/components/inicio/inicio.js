import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Midia from '../midia/midia';
import Mensagens from '../mensagens/mensagens';
import styles from './style';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

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
    </Tab.Navigator>
  );
}

const Inicio = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [loadingNotificacoes, setLoadingNotificacoes] = useState(true);
  const [token, setToken] = useState('');
  const [connectionId, setConnectionId] = useState('');
  const [userType, setUserType] = useState('');
  
  const navigation = useNavigation();

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedConnectionId = await AsyncStorage.getItem('destinatarioId');
        const storedUserType = await AsyncStorage.getItem('userType'); 

  
  
        if (storedToken) setToken(storedToken);
        if (storedConnectionId) setConnectionId(storedConnectionId.replace(/"/g, '').trim());
        if (storedUserType) setUserType(storedUserType.replace(/"/g, '').trim());
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
  
    carregarDados();
  }, []);
  

  useEffect(() => {
    const carregarNotificacoes = async () => {
      setLoadingNotificacoes(true);
      try {
        let todasNotificacoes = [];
  
        if (userType === 'cuidador') {
          const responseMensagens = await axios.get(
            `http://192.168.100.21:3000/api/mensagens-naolidas`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const responseMidias = await axios.get(
            `http://192.168.100.21:3000/api/midias-semana`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          todasNotificacoes = [...responseMensagens.data, ...responseMidias.data];
        } if (userType === 'familiar/amigo') {
          try {

            const responseMensagens = await axios.get(
              `http://192.168.100.21:3000/api/mensagens-naolidas/${connectionId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            todasNotificacoes = [...responseMensagens.data];
          } catch (error) {
            console.error('Erro ao carregar notificações para familiar/amigo:', error.message);
          }
        }
  
        todasNotificacoes.sort((a, b) => new Date(b.dataEnvio) - new Date(a.dataEnvio));
        setNotificacoes(todasNotificacoes);
      } catch (error) {
        console.error('Erro ao carregar as notificações:', error.response ? error.response.data : error.message);
      } finally {
        setLoadingNotificacoes(false);
      }
    };
  
    if (token && (userType === 'cuidador' || (connectionId && connectionId.trim() !== ''))) {
      carregarNotificacoes();
    }
  }, [token, connectionId, userType]);
  
  

  const marcarMensagemComoLida = async (mensagemId) => {
    try {
      await axios.put(
        `http://192.168.100.21:3000/api/marcar-como-lida/${mensagemId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Erro ao marcar mensagem como lida:', error.response ? error.response.data : error.message);
    }
  };

  const marcarMidiaComoLida = async (midiaId) => {
    try {
      await axios.put(
        `http://192.168.100.21:3000/api/marcar-midia-como-lida/${midiaId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Erro ao marcar mídia como lida:', error.response ? error.response.data : error.message);
    }
  };
  

  const formatarDataEnvio = (dataEnvio) => {
    const agora = new Date();
    const data = new Date(dataEnvio);
    const diffDias = Math.floor((agora - data) / (1000 * 60 * 60 * 24));

    if (diffDias === 0) return 'Hoje';
    if (diffDias === 1) return 'Ontem';
    if (diffDias <= 3) return `${diffDias} dias atrás`;
    if (diffDias <= 7) return '1 semana atrás';
    if (diffDias <= 21) return '3 semanas atrás';
    return data.toLocaleDateString();
  };

  const calculateAge = (nascDate) => {
    const nascimento = new Date(nascDate);
    const hoje = new Date();
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const diferencaMeses = hoje.getMonth() - nascimento.getMonth();
    return diferencaMeses < 0 || (diferencaMeses === 0 && hoje.getDate() < nascimento.getDate()) ? idade - 1 : idade;
  };

  const renderizarImagem = (caminho) => {
    if (caminho) {
      const imageUrl = `http://192.168.100.21:3000/${caminho.replace(/\\/g, '/')}`;
      return <Image source={{ uri: imageUrl }} style={styles.midiaImage} />;
    }
    return null;
  };

  if (loadingNotificacoes) {
    return <ActivityIndicator size="large" color="#06C8F2" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.user} onPress={() => navigation.navigate('User')}>
          <MaterialCommunityIcons name="account-circle" color="white" size={44} />
          <Text style={styles.userText}>Usuário</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.notificationContainer}>
        <Text style={styles.sectionTitle}>Notificações</Text>
        {notificacoes.map((notificacao) => (
          <TouchableOpacity
            key={notificacao._id}
            onPress={async () => {
              try {
                if (!notificacao.caminho) {
                  await marcarMensagemComoLida(notificacao._id);
                  
                  const chatConnectionId = userType === 'cuidador' ? notificacao.remetente : notificacao.destinatario;
                  navigation.navigate('Chat', { connectionId: chatConnectionId });
                } else {
                  await marcarMidiaComoLida(notificacao._id);

                  const chatConnectionId = userType === 'cuidador' ? notificacao.remetente._id : connectionId;
                  navigation.navigate('ChatMidias', { connectionId: chatConnectionId });
                }

                setNotificacoes((prevNotificacoes) =>
                  prevNotificacoes.filter((n) => n._id !== notificacao._id)
                );
              } catch (error) {
                console.error('Erro ao navegar:', error.message);
              }
            }}
          > 
            <View style={notificacao.caminho ? styles.midiaCard : styles.mensagemCard}>
              <Text style={styles.mensPass}>{formatarDataEnvio(notificacao.dataEnvio)}</Text>

              {notificacao.caminho && userType === 'cuidador' && (
                <>
                  <View style={styles.midiaInfoContainer}>
                    <Text style={styles.senderName}>{notificacao.remetente.name}</Text>
                    <View style={styles.senderDetails}>
                      <Text style={styles.senderRelation}>{notificacao.remetente.relation},</Text>
                      <Text style={styles.senderAge}>{calculateAge(notificacao.remetente.nascDate)} anos</Text>
                    </View>
                  </View>
                  {renderizarImagem(notificacao.caminho)}
                </>
              )}

              <Text style={notificacao.caminho ? styles.midiaDescription : styles.mensagemTexto}>
                {notificacao.descricao || notificacao.texto}
              </Text>
              <Text style={styles.mensagemInfo}>
                {new Date(notificacao.dataEnvio).toLocaleTimeString()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyTabs;