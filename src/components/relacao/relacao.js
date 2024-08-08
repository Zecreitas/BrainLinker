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

  const handleRelacao = () => {
    if (!relation || !nascDate) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
    }
    navigation.navigate('Cad', { userType, relation, nascDate });
};
  return (
    <View>
        <View>
        <Image style={styles.image}
          source={require('../../../assets/images/logo.png')}>
        </Image>  
        </View>
        <Text style={styles.texto}>O que Você é do Paciente?</Text>
        <TextInput
                style={styles.formInput}
                placeholder="Exemplo: Filho, sobrinho,amigo,etc."
                placeholderTextColor={'white'}
                value={relation}
                onChangeText={setRelation}
        >
        </TextInput>
        <Text style={styles.texto}>Qual é a sua data de nascimento?</Text>
        <TextInput
                style={styles.formInput}
                placeholder="Exemplo: 2006-05-31"
                placeholderTextColor={'white'}
                value={nascDate}
                onChangeText={setNascDate}
        >
        </TextInput>
        <TouchableOpacity style={styles.login}
        onPress={handleRelacao}>
          <Text style={styles.text}>Continuar</Text>
        </TouchableOpacity>
    </View>
    
  );
};

export default Relacao;