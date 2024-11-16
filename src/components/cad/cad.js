import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Text, TextInput} from 'react-native';
import styles from './style';
import api from '../../config/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';

const Cad = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { userType = '', relation = '', nascDate = '' } = route.params || {};

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [senhaVisible, setSenhaVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const toggleSenha = () => {
      setSenhaVisible(!senhaVisible);
    };

    const handleCadastro = async () => {
      try {
          const response = await api.post('/cadastro', {
              name,
              email,
              password,
              userType,
              relation: userType === 'familiar/amigo' ? relation : '',
              nascDate: userType === 'familiar/amigo' ? nascDate : '',
          });
  
          alert('Cadastro realizado com sucesso');
          if (userType === 'cuidador') {
              navigation.navigate('Login'); 
          } else {
          navigation.navigate('Login');
          }
      } catch (error) {
          if (error.response && error.response.data.message) {
              setErrorMessage(error.response.data.message);
          } else {
              setErrorMessage('Cadastro falhou. Verifique os dados e tente novamente.');
          }
          console.error('Erro ao cadastrar:', error.response ? error.response.data : error.message);
      }
  };
  

  return (
    <View>
      <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
      </TouchableOpacity>
        <View>
        <Image style={styles.image}
          source={require('../../../assets/images/logo.png')} />
        <Text style={styles.texto}>Nome</Text>
        <View style={styles.formInput}>
        <TextInput
                style={styles.inputText}
                placeholder="Digite seu Nome Aqui..."
                value={name}
                onChangeText={setName}
                placeholderTextColor={'white'}
        />
        </View>
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
        <TouchableOpacity style={styles.cad}
        onPress={handleCadastro}
        >
          <Text style={styles.text}>Cadastrar-se</Text>
        </TouchableOpacity>


        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
    </View>
  );
};

export default Cad;