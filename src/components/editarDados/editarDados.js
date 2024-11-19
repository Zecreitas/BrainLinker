import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EditarDados = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [emailConnection, setEmailConnection] = useState('');

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');

        if (storedToken && userId) {
          const response = await axios.get(`https://brainlinker-api-production.up.railway.app/api/user/${userId}`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });

          if (response.status === 200) {
            setUserData(response.data);
            setName(response.data.name);
            setRelation(response.data.relation || '');
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

  const atualizarDados = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      const response = await axios.put(`https://brainlinker-api-production.up.railway.app/api/user/${userId}`, {
        name,
        relation,
      }, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os dados.');
    }
  };

  const adicionarConexao = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');

      const response = await axios.post(`https://brainlinker-api-production.up.railway.app/api/conectar`, {
        emailCuidador: emailConnection,
      }, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Conexão adicionada com sucesso!');
        setEmailConnection('');
      }
    } catch (error) {
      console.error('Erro ao adicionar conexão:', error);
      Alert.alert('Erro', 'Não foi possível adicionar a conexão.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#06C8F2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarButton}>
        <MaterialCommunityIcons name="arrow-left" size={30} color="black" style={{ marginTop: 5 }} />
      </TouchableOpacity>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Relação:</Text>
      <TextInput
        style={styles.input}
        value={relation}
        onChangeText={setRelation}
      />

      <Text style={styles.label}>Adicionar Conexão (Email):</Text>
      <TextInput
        style={styles.input}
        value={emailConnection}
        onChangeText={setEmailConnection}
      />

      <TouchableOpacity style={styles.button} onPress={atualizarDados}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={adicionarConexao}>
        <Text style={styles.buttonText}>Adicionar Conexão</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditarDados;