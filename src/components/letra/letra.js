import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFontSize } from '../../../app/(tabs)/FontSizeContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Letra = () => {
  const navigation = useNavigation();
  const { fontSize, setFontSize } = useFontSize();

  const handleFontSizeChange = (value) => {
    setFontSize(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarButton}>
        <MaterialCommunityIcons name="arrow-left" size={30} color="black" style={{ marginTop: 5 }} />
      </TouchableOpacity>

      <Text style={styles.titulo}>Ajuste o Tamanho da Letra</Text>

      <Slider
        style={styles.slider}
        minimumValue={80}
        maximumValue={130}
        step={1}
        value={fontSize}
        onValueChange={handleFontSizeChange}
        minimumTrackTintColor="#092845"
        maximumTrackTintColor="#C0C0C0"
      />

      <Text style={[styles.tamanhoExemplo, { fontSize: fontSize * 0.16 }]}>
        Exemplo de texto com tamanho ajustável
      </Text>
    </View>
  );
};

export default Letra;