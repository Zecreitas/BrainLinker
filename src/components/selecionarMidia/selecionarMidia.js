import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SelecionarMidia = () => {
  const [midia, setMidia] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [token, setToken] = useState('');
  const [remetenteId, setRemetenteId] = useState('');
  const [destinatarioId, setDestinatarioId] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const carregarDados = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedRemetenteId = await AsyncStorage.getItem('remetenteId');
      const storedDestinatarioId = await AsyncStorage.getItem('destinatarioId');

      if (storedToken) setToken(storedToken);
      if (storedRemetenteId) setRemetenteId(storedRemetenteId);
      if (storedDestinatarioId) setDestinatarioId(storedDestinatarioId);
    };

    carregarDados();
    selecionarMidia();
  }, []);

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
    if (!midia) {
      Alert.alert('Erro', 'Nenhuma mídia selecionada');
      return;
    }
  
    const midiaUri = midia.uri.startsWith('file://') ? midia.uri : `file://${midia.uri}`;
  
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: midiaUri,
        type: midia.mimeType,
        name: midia.fileName,
      });
      formData.append("descricao", descricao);
      formData.append("remetenteId", remetenteId);
      formData.append("tipo", "foto");
  
      const response = await axios.post('https://brainlinker-api-production.up.railway.app/api/upload-midia', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        }
      });

      Alert.alert('Sucesso', 'Mídia enviada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao enviar a mídia:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar a mídia.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {midia && <Image source={{ uri: midia.uri }} style={styles.imagemSelec} />}

        <TextInput
          style={styles.input}
          placeholder="Digite uma descrição..."
          value={descricao}
          onChangeText={setDescricao}
        />

        <TouchableOpacity onPress={enviarMidia} style={styles.botaoEnviar}>
          <Text style={styles.botaoTexto}>Enviar Mídia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelecionarMidia;