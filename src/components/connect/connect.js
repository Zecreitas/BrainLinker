import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchUsers = async () => {
    try {
      const response = await axios.get(`http://192.168.100.21:3000/api/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const connectUser = async (cuidadorEmail, familiarEmail) => {
    try {
      const response = await axios.post('http://192.168.100.21:3000/api/connect', {
        cuidadorEmail,
        familiarEmail
      });

      if (response.status === 201) {
        console.log('Conexão criada com sucesso!');
        // Navegar para outra tela ou mostrar uma mensagem de sucesso
      }
    } catch (error) {
      console.error('Erro ao criar conexão:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.nome} - {item.email}</Text>
      <TouchableOpacity
        onPress={() => connectUser('cuidador@example.com', item.email)} // Substitua pelo email do cuidador logado
        style={styles.button}
      >
        <Text>Conectar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por nome ou email"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity onPress={searchUsers} style={styles.searchButton}>
        <Text>Buscar</Text>
      </TouchableOpacity>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
});

export default SearchScreen;
