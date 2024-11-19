import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Midia = () => {
  const [midias, setMidias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [isCuidador, setIsCuidador] = useState(false);
  const [contatos, setContatos] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const carregarToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Erro ao carregar o token:', error);
      }
    };
    carregarToken();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        carregarMidias();
        if (isCuidador) {
          carregarContatos();
        }
      }
    }, [token, isCuidador])
  );

  useEffect(() => {
    const carregarUserType = async () => {
      try {
        let storedUserType = await AsyncStorage.getItem('userType');
        if (!storedUserType) {
          await AsyncStorage.setItem('userType', 'familiar/amigo');
          storedUserType = 'familiar/amigo';
        }
        setIsCuidador(storedUserType === 'cuidador');
      } catch (error) {
        console.error('Erro ao carregar ou definir o userType:', error);
      }
    };
    carregarUserType();
  }, []);

  const carregarMidias = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://brainlinker-api-production.up.railway.app/api/midias', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        const midiasOrdenadas = response.data
          .sort((a, b) => new Date(b.dataEnvio) - new Date(a.dataEnvio))
          .filter((midia, index, self) => 
            index === self.findIndex((m) => new Date(m.dataEnvio).getTime() === new Date(midia.dataEnvio).getTime())
          );
  
        setMidias(midiasOrdenadas);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar as mídias');
      }
    } catch (error) {
      console.error('Erro ao carregar as mídias:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const carregarContatos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://brainlinker-api-production.up.railway.app/api/contatos-midias', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setContatos(response.data);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os contatos de mídias');
      }
    } catch (error) {
      console.error('Erro ao carregar os contatos de mídias:', error);
    } finally {
      setLoading(false);
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
    const today = new Date();
    const birthDate = new Date(nascDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatSendTime = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() - 3); 
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.user}
            onPress={() => navigation.navigate('User')}
        >
          <MaterialCommunityIcons name="account-circle" color="white" size={44} />
          <Text style={styles.userText}>Usuário</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        {isCuidador ? (
          <>
            <Text style={styles.textEnvi}>Lista de Contatos</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#06C8F2" style={{ marginTop: 20 }} />
            ) : (
              contatos.map((contato) => (
                <TouchableOpacity 
                  key={contato._id} 
                  style={styles.contatoCard}
                  onPress={() => navigation.navigate('ChatMidias', { contatoId: contato._id })}
                >
                  <View style={styles.contatoInfoContainer}>
                    <Text style={styles.contatoNome}>{contato.name}</Text>
                    <Text style={styles.contatoInfo}>{contato.relation}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </>
        ) : (
          <>
            <Text style={styles.selecText}>Adicionar Midia</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SelecionarMidia')} style={styles.botao}>
              <MaterialCommunityIcons name="plus" color="white" size={50} marginTop={5} />
            </TouchableOpacity>
  
            <Text style={styles.textEnvi}>Mídias já enviadas</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#06C8F2" style={{ marginTop: 20 }} />
            ) : (
              midias.map((midia) => (
                <View key={midia._id} style={styles.midiaCard}>
                  <View style={styles.midiaInfoContainer}>
                    <Text style={styles.senderName}>{midia.remetente.name}</Text>
                    <View style={styles.senderDetails}>
                      <Text style={styles.senderRelation}>{midia.remetente.relation},</Text>
                      <Text style={styles.senderAge}>{calculateAge(midia.remetente.nascDate)} anos</Text>
                    </View>
                    <Text style={styles.sendTime}>{formatarDataEnvio(midia.dataEnvio)} às {formatSendTime(midia.dataEnvio)}</Text>
                  </View>
                  <Image
                    source={{ uri: `https://brainlinker-api-production.up.railway.app/${midia.caminho.replace(/\\/g, '/')}` }}
                    style={styles.midiaImage}
                  />
                  <Text style={styles.midiaDescription}>{midia.descricao}</Text>
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Midia;