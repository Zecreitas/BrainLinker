import React, { useEffect, useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Alert, Image} from 'react-native';
import axios from 'axios';
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Midia = () => {
  const route = useRoute();
  const [midia, setMidia] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [token, setToken] = useState('');
  const [remetenteId, setRemetenteId] = useState('');
  const [conexoes, setConexoes] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('token').then(storedToken => {
      setToken(storedToken || '');
    });

    AsyncStorage.getItem('conexoes').then(storedConexoes => {
      if (storedConexoes) {
        setConexoes(JSON.parse(storedConexoes));
        setDestinatarioId(JSON.parse(storedConexoes)[0] || '');
      }
    });
  }, []);

  const selecionarMidia = async () => {
    // Pedir permissão para acessar a galeria
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
    if (!token || !remetenteId) {
      Alert.alert('Erro', 'Token ou remetente não encontrado. Por favor, faça login novamente.');
      return;
    }

    if (!midia) {
      Alert.alert('Erro', 'Nenhuma mídia selecionada');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: midia.uri,
        type: midia.type,
        name: midia.fileName,
      });
      formData.append('tipo', 'foto'); // Ou 'vídeo', configurar isso depois
      formData.append('descricao', descricao);
      formData.append('remetenteId', remetenteId);

      const response = await axios.post('http://192.168.100.21:3000/api/upload-midia', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Mídia enviada com sucesso!');
      } else {
        Alert.alert('Erro', 'Falha ao enviar a mídia');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível enviar a mídia');
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
      {/* botoões estão sem um design certo, aidna está para teste, arrumar isso */}
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        {midia && <Image source={{ uri: midia.uri }} style={{ width: 200, height: 200, marginBottom: 20 }} />}
        
        <TouchableOpacity onPress={selecionarMidia} style={styles.botao}>
          <Text style={styles.botaoTexto}>Selecionar Mídia</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={enviarMidia} style={styles.botao}>
          <Text style={styles.botaoTexto}>Enviar Mídia</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Midia;