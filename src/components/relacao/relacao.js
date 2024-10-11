import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Text, TextInput} from 'react-native';
import styles from './style';
import { useNavigation, useRoute} from '@react-navigation/native';

const Relacao= () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userType } = route.params;

  const [relation, setRelation] = useState('');
  const [nascDate, setNascDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRelacao = () => {
    if (!relation || !nascDate) {
        setErrorMessage('Preencha todos os campos para continuar.');
        return;
    }
    setErrorMessage(''); 
    navigation.navigate('Cad', { userType, relation, nascDate });
};

  return (
    <View>
        <View>
        <Image style={styles.image}
          source={require('../../../assets/images/logo.png')} />
        </View>
        <Text style={styles.texto}>O que Você é do Paciente?</Text>
        <TextInput
                style={styles.formInput}
                placeholder="Exemplo: Filho, sobrinho, amigo, etc."
                placeholderTextColor={'white'}
                value={relation}
                onChangeText={setRelation}
        />
        <Text style={styles.texto}>Qual é a sua data de nascimento?</Text>
        <TextInput
                style={styles.formInput}
                placeholder="Exemplo: 2006-05-31"
                placeholderTextColor={'white'}
                value={nascDate}
                onChangeText={setNascDate}
        />
        <TouchableOpacity style={styles.login} onPress={handleRelacao}>
          <Text style={styles.text}>Continuar</Text>
        </TouchableOpacity>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

export default Relacao;