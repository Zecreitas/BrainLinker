import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mensagens = () => {
  const navigation = useNavigation();
  const [contatos, setContatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUserType = await AsyncStorage.getItem('userType');
      
      if (storedToken) setToken(storedToken);
      if (storedUserType) setUserType(storedUserType);
    };
    carregarDados();
  }, []);

  useEffect(() => {
    if (token && userType) {
      carregarContatos();
    }
  }, [token, userType]);

  const carregarContatos = async () => {
    try {
      setLoading(true);
      const endpoint = userType === 'cuidador' 
        ? 'https://brainlinker-api-production.up.railway.app/api/contatos/cuidador'
        : 'https://brainlinker-api-production.up.railway.app/api/contatos/familiar';
  
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log('Dados da API:', response.data); 
  
      if (response.status === 200) {
        const contatosOrdenados = await Promise.all(
          response.data.map(async (contato) => {
            const ultimaMensagem = await fetchUltimaMensagem(contato._id);
            return { ...contato, ultimaMensagem };
          })
        );
        contatosOrdenados.sort((a, b) => new Date(b.ultimaMensagem?.data) - new Date(a.ultimaMensagem?.data));
        setContatos(contatosOrdenados);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os contatos');
      }
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchUltimaMensagem = async (connectionId) => {
    try {
      const response = await axios.get(`https://brainlinker-api-production.up.railway.app/api/messages/${connectionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && response.data.length > 0) {
        return response.data[response.data.length - 1];
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar última mensagem:', error);
      return null;
    }
  };

  const abrirChat = (contato) => {
    console.log('Contato antes de navegar:', contato);
    console.log('ID enviado:', contato._id);
    navigation.navigate('Chat', { 
      connectionId: contato._id, 
      destinatarioId: contato._id 
    });
  };
  
  
  

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.user} onPress={() => navigation.navigate('User')}>
          <MaterialCommunityIcons name="account-circle" color="#092845" size={50} />
          <Text style={styles.userText}>Usuário</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contatosContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#06C8F2" />
        ) : contatos.length > 0 ? (
          contatos.map((contato) => (
            <TouchableOpacity
              key={contato._id}
              style={styles.contatoCard}
              onPress={() => {
                abrirChat(contato);
              }}
                
            >
              <Text style={styles.contatoNome}>{contato.name}</Text>
              <Text style={styles.contatoInfo}>
                {contato.relation}
                {userType === 'cuidador' && `, ${contato.age-1} anos`}
              </Text>
              <Text style={styles.ultimaMensagem}>
                {contato.ultimaMensagem?.texto || 'Sem mensagens ainda'}
              </Text>
              {contato.ultimaMensagem?.data && (
                <Text style={styles.dataMensagem}>
                  {new Date(contato.ultimaMensagem.data).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.semContatos}>Nenhum contato conectado</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Mensagens;
