import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Text, TextInput } from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Logo = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [senhaVisible, setSenhaVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Novo estado para armazenar o erro
  const navigation = useNavigation();

  const toggleSenha = () => {
    setSenhaVisible(!senhaVisible);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.100.21:3000/api/login', { email, password });

      const { token, user } = response.data;

      if (token && user) {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));

        navigation.navigate('Connect');
      } else {
        setErrorMessage('Dados de login inválidos'); 
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.response ? error.response.data : error.message);
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais e tente novamente.'); 
    }
  };

  return (
    <View>
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
          <Icon
            name={senhaVisible ? 'visibility' : 'visibility-off'}
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

export default Logo;
