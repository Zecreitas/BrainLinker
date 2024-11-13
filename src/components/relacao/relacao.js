import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, Image, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './style';

const Relacao = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userType } = route.params;

  const [relation, setRelation] = useState('');
  const [nascDate, setNascDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirmDate = (date) => {
    // Formatando a data para 'YYYY-MM-DD'
    const formattedDate = date.toISOString().split('T')[0];
    setNascDate(formattedDate);
    setDatePickerVisibility(false);
  };

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
        <Image
          style={styles.image}
          source={require('../../../assets/images/logo.png')}
        />
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

      <TouchableOpacity
        style={styles.formInput}
        onPress={() => setDatePickerVisibility(true)}
      >
        <Text style={{ color: nascDate ? 'white' : 'gray', marginTop: 10 ,fontSize: 16 }}>
          {nascDate ? nascDate : 'Selecionar data'}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
        maximumDate={new Date()} 
        locale="pt-BR"
      />

      <TouchableOpacity style={styles.login} onPress={handleRelacao}>
        <Text style={styles.text}>Continuar</Text>
      </TouchableOpacity>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

export default Relacao;