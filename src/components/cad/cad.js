import React, {useState, useEffect} from 'react';
import {Image, View, TouchableOpacity, Text, TextInput, Button} from 'react-native';
import styles from './style';
import api from '../../config/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation, useRoute } from '@react-navigation/native';

const Cad= () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { userType = '', relation = '', nascDate = '' } = route.params || {};

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [senhaVisible, setSenhaVisible] = useState(false);

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
            navigation.navigate('Connect');
        } catch (error) {
            alert('Cadastro falhou');
            console.error(error);
        }
    };

  return (
    <View>
        <View>
        <Image style={styles.image}
          source={require('../../../assets/images/logo.png')}>
        </Image>
        <Text style={styles.texto}>Nome</Text>
        <View style={styles.formInput}>
        <TextInput
                style={styles.inputText}
                placeholder="Digite seu Nome Aqui..."
                value={name}
                onChangeText={setName}
                placeholderTextColor={'white'}
        >
        </TextInput>
        </View>
        <Text style={styles.texto}>Email</Text>
        <View style={styles.formInput}>
        <TextInput
                style={styles.inputText}
                placeholder="Digite seu Email Aqui..."
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'white'}
        >
        </TextInput>
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
        >
        </TextInput>
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
          <Text style={styles.text}>Cadastra-se</Text>
        </TouchableOpacity>
    </View>
    <View>
    <Text style={styles.plat}>Ou Registre uma conta pelo Google</Text>
        <TouchableOpacity>
          
        <Image style={styles.google} source={require('../../../assets/images/google.png')} />
        </TouchableOpacity>
    </View>
    </View>
    
  );
};

export default Cad;