import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert, Image, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Midia = () => {
  const [midia, setMidia] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [token, setToken] = useState('');
  const [remetenteId, setRemetenteId] = useState('');
  const [destinatarioId, setDestinatarioId] = useState('');
  const [midias, setMidias] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [connectionId, setConnectionId] = useState('');

  const navigation = useNavigation();


  useEffect(() => {
    const carregarDados = async () => {
      try {
        const storedConnectionId = await AsyncStorage.getItem('connectionId');
        const storedToken = await AsyncStorage.getItem('token');
        const storedRemetenteId = await AsyncStorage.getItem('remetenteId');
        const storedDestinatarioId = await AsyncStorage.getItem('destinatarioId');

        if (storedConnectionId) setConnectionId(storedConnectionId);
        if (storedToken) setToken(storedToken);
        if (storedRemetenteId) setRemetenteId(storedRemetenteId);
        if (storedDestinatarioId) setDestinatarioId(storedDestinatarioId);
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

  const selecionarMidia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de permissão para acessar suas fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMidia(result.assets[0]);
    }
  };

  const enviarMidia = async () => {
    if (!token || !remetenteId || !destinatarioId) {
      Alert.alert('Erro', 'Token ou remetente/destinatário não encontrado. Por favor, faça login novamente.');
      return;
    }
  
    if (!midia) {
      Alert.alert('Erro', 'Nenhuma mídia selecionada');
      return;
    }
  
    const midiaUri = midia.uri.startsWith('file://') ? midia.uri : `file://${midia.uri}`;
  
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: midiaUri,
        type: midia.type || 'image/jpeg',
        name: midia.fileName || 'imagem.jpg',
      });
      formData.append('tipo', 'foto');
      formData.append('descricao', descricao);
      formData.append('remetenteId', remetenteId);
      formData.append('destinatarioId', destinatarioId);
  
      console.log('Dados a serem enviados:', {
        uri: midiaUri,
        type: midia.type || 'image/jpeg',
        name: midia.fileName || 'imagem.jpg',
        tipo: 'foto',
        descricao,
        remetenteId,
        destinatarioId,
      });
  
      const response = await axios.post('http://192.168.100.21:3000/api/upload-midia', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        timeout: 5000,
      });
  
      console.log('Resposta do servidor:', response);
  
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Mídia enviada com sucesso!');
        setMidia(null);
        setDescricao('');
      } else {
        Alert.alert('Erro', 'Falha ao enviar a mídia');
      }
    } catch (error) {
      if (error.response) {
        console.error('Erro no servidor:', error.response.data);
        Alert.alert('Erro no servidor', error.response.data.message || 'Ocorreu um erro ao enviar a mídia');
      } else if (error.request) {
        console.error('Sem resposta do servidor:', error.request);
        Alert.alert('Erro', 'Sem resposta do servidor');
      } else {
        console.error('Erro desconhecido:', error.message);
        Alert.alert('Erro', error.message);
      }
    }
  };  

  const carregarMidias = async () => {
    try {
      setLoading(true); 
      const cleanedConnectionId = connectionId.replace(/"/g, '');
      const response = await axios.get(`http://192.168.100.21:3000/api/midias/${cleanedConnectionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        setMidias(response.data);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar as mídias');
      }
    } catch (error) {
      console.error('Erro ao carregar as mídias:', error);
    } finally {
      setLoading(false); 
    }
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
        <Text style={styles.selecText}>Toque para enviar uma mídia</Text>
        {midia && <Image source={{ uri: midia.uri }} style={styles.imagemSelec} />}

        <TouchableOpacity onPress={selecionarMidia} style={styles.botao}>
          <MaterialCommunityIcons name="plus" color="white" size={50} alignSelf="center" marginTop={5} />
        </TouchableOpacity>

        <Text style={styles.textDesc}>Descrição da mídia:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite uma descrição..."
          value={descricao}
          onChangeText={setDescricao}
        />

        <TouchableOpacity onPress={enviarMidia} style={styles.botaoEnviar}>
          <Text style={styles.botaoTexto}>Enviar Mídia</Text>
        </TouchableOpacity>

        <Text style={styles.textEnvi}>Mídias já enviadas</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#06C8F2" style={{ marginTop: 20 }} />
        ) : (
          midias.map((midia) => (
            <View key={midia._id} style={[styles.midiaCard]}>
              <Image
                source={{ uri: `http://192.168.100.21:3000/${midia.caminho.replace(/\\/g, '/')}` }}
                style={styles.midiaImage}
              />
              <Text style={styles.midiaDescription}>{midia.descricao}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Midia;
