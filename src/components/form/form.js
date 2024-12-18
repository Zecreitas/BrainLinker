import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Text, TextInput } from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [senhaVisible, setSenhaVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const toggleSenha = () => {
    setSenhaVisible(!senhaVisible);
  };


  const handleLogin = async () => {
    try {
      const response = await axios.post('https://brainlinker-api-production.up.railway.app/api/login', { email, password });
  
      const { token, user } = response.data;
  
      if (token && user) {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userId', user.id.toString());
        await AsyncStorage.setItem('userType', user.userType);
        await AsyncStorage.setItem('remetenteId', user.id.toString());
  
        if (user.connections && user.connections.length > 0) {
          await AsyncStorage.setItem('connections', JSON.stringify(user.connections)); 
        }      
  
        if (user.userType === 'cuidador') {
          navigation.navigate('Inicio');
        } else {
          navigation.navigate('Connect');
        }
      } else {
        setErrorMessage('Dados de login inválidos');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      }
      console.error('Erro ao fazer login:', error.response ? error.response.data : error.message);
    }
  };
  
  
  

  return (
    <View>
      <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
      </TouchableOpacity>
      <Image style={styles.image} source={require('../../../assets/images/logo.png')} />
      <Text style={styles.texto}>Email</Text>
      <View style={styles.formInput}>
        <TextInput
          style={styles.inputText}
          placeholder="Digite seu Email Aqui..."
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={'white'}
        />
      </View>
      <Text style={styles.texto}>Senha</Text>
      <View style={styles.formInput}>
        <TextInput
          style={styles.inputText}
          placeholder="Digite sua Senha Aqui..."
          secureTextEntry={!senhaVisible}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={'white'}
        />
        <TouchableOpacity onPress={toggleSenha} style={styles.toggle}>
          <MaterialCommunityIcons
            name={senhaVisible ? 'eye' : 'eye-off'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.login} onPress={handleLogin}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

export default Form;
