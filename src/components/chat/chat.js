import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from './style';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Chat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { connectionId, destinatarioId } = route.params || {};
  const [mensagens, setMensagens] = useState([]);
  const [textoMensagem, setTextoMensagem] = useState('');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [remetenteId, setRemetenteId] = useState(null);
  const scrollViewRef = useRef();

  useEffect(() => {
    if (mensagens.length && route.params?.mensagemId) {
      const mensagemIndex = mensagens.findIndex(m => m._id === route.params.mensagemId);
      if (mensagemIndex !== -1) {
        const alturaDoItem = 80; 
        scrollViewRef.current?.scrollTo({
          y: mensagemIndex * alturaDoItem,
          animated: true,
        });
      }
    }
  }, [mensagens, route.params?.mensagemId]);

  useEffect(() => {
    const carregarDados = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedRemetenteId = await AsyncStorage.getItem('remetenteId');
      
      if (storedToken) setToken(storedToken);
      if (storedRemetenteId) setRemetenteId(storedRemetenteId);

      if (connectionId && storedToken) fetchMensagens();
    };
  
    carregarDados();
  }, [connectionId]);

  useEffect(() => {
    console.log('Parâmetros recebidos na tela de chat:', route.params);
  }, []);
  

  const fetchMensagens = async () => {
    if (!connectionId || !token) return;
    
    try {
      const response = await axios.get(`https://brainlinker-api-production.up.railway.app/api/messages/${connectionId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setMensagens(response.data);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connectionId && token) fetchMensagens();
  }, [connectionId, token]);

  const enviarMensagem = async () => {
    if (!textoMensagem || !remetenteId || !destinatarioId || !token) {
      console.log('Erro: Algum dado está ausente', { textoMensagem, remetenteId, destinatarioId, token });
      return;
    }
  
    try {
      console.log('Enviando mensagem com os seguintes dados:', {
        destinatarioId,
        textoMensagem,
        remetenteId,
        token,
      });
  
      const response = await axios.post(
        'https://brainlinker-api-production.up.railway.app/api/messages',
        { destinatarioId, texto: textoMensagem },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
  
      console.log('Resposta do servidor ao enviar mensagem:', response.data);
  
      if (response.data.mensagem) {
        setMensagens([...mensagens, response.data.mensagem]);
      }
      setTextoMensagem('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
    }
  };
  

  const formatarHora = (data) => {
    return moment(data).tz('America/Sao_Paulo').format('HH:mm');
  };

  const agruparMensagensPorData = () => {
    const mensagensAgrupadas = {};

    mensagens.forEach(mensagem => {
      const dataEnvio = moment(mensagem.dataEnvio).tz('America/Sao_Paulo').format('YYYY-MM-DD');
      if (!mensagensAgrupadas[dataEnvio]) mensagensAgrupadas[dataEnvio] = [];
      mensagensAgrupadas[dataEnvio].push(mensagem);
    });

    return mensagensAgrupadas;
  };

  const mensagensPorData = agruparMensagensPorData();

  if (loading) {
    return <ActivityIndicator size="large" color="#06C8F2" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarButton}>
        <MaterialCommunityIcons name="arrow-left" size={30} color="black" style={{ marginTop: 5 }} />
      </TouchableOpacity>

      <ScrollView
        style={styles.mensagemContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {Object.keys(mensagensPorData).map(data => (
          <View key={data} style={styles.dataContainer}>
            <Text style={styles.dataTitulo}>{moment(data).format('DD/MM/YYYY')}</Text>
            <View style={styles.linhaSeparacao} />
            {mensagensPorData[data].map(mensagem => (
              <View
                key={mensagem._id}
                style={[
                  styles.balaoMensagem,
                  mensagem.remetente === remetenteId ? styles.balaoRemetente : styles.balaoDestinatario,
                ]}
              >
                <Text
                  style={[
                    styles.textoMensagem,
                    mensagem.remetente === remetenteId ? styles.textoRemetente : styles.textoDestinatario,
                  ]}
                >
                  {mensagem.texto}
                </Text>
                <Text style={styles.horaMensagem}>{formatarHora(mensagem.dataEnvio)}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          value={textoMensagem}
          onChangeText={setTextoMensagem}
          placeholder="Digite sua mensagem..."
          style={styles.input}
        />
        <TouchableOpacity onPress={enviarMensagem} style={styles.botaoEnviar}>
          <MaterialCommunityIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;