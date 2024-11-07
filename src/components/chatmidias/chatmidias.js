import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatMidias = () => {
  const [midias, setMidias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { contatoId } = route.params;

  useEffect(() => {
    const carregarToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        } else {
          console.log('Nenhum token encontrado'); 
        }
      } catch (error) {
        console.error('Erro ao carregar o token:', error);
      }
    };
    carregarToken();
  }, []);

  useEffect(() => {
    const carregarMidiasContato = async () => {
      if (token && contatoId) {
        try {
          setLoading(true);
          const response = await axios.get(`http://192.168.100.21:3000/api/midias/contato/${contatoId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setMidias(response.data);
          } else {
            Alert.alert('Erro', 'Não foi possível carregar as mídias do contato');
          }
        } catch (error) {
          console.error('Erro ao carregar as mídias do contato:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('Token ou contatoId não definidos. Token:', token, 'contatoId:', contatoId);
      }
    };
    carregarMidiasContato();
  }, [token, contatoId]);

  const calcularIdade = (dataNasc) => {
    const nascimento = new Date(dataNasc);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={30} color="#000" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#06C8F2" />
        ) : midias.length > 0 ? (
          midias.map((midia) => (
            <View key={midia._id} style={styles.midiaCard}>
              <Image
                source={{ uri: `http://192.168.100.21:3000/${midia.caminho.replace(/\\/g, '/')}` }}
                style={styles.midiaImage}
              />
              <Text style={styles.midiaDescription}>{midia.descricao}</Text>
              <Text style={styles.remetenteInfo}>
                {midia.remetente.name} - {calcularIdade(midia.remetente.nascDate)} anos ({midia.remetente.relation})
              </Text>
              <Text style={styles.sendTime}>
                {new Date(midia.dataEnvio).toLocaleString('pt-BR', {
                  timeZone: 'America/Sao_Paulo',
                })}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noMidiaText}>Nenhuma mídia encontrada para este contato.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ChatMidias;
