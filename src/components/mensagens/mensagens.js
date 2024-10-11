import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Mensagens = () => {
  const navigation = useNavigation();
  
  return (
    <View>
      <View style={styles.nav}>
      <TouchableOpacity style={styles.user}
          onPress={() => navigation.navigate('User')}
        >
          <MaterialCommunityIcons name="account-circle" color="white" size={44}  />
          <Text style={styles.userText}>Usuário</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text>Try editing me! 🎉</Text>
      </ScrollView>
    </View>
  );
};

export default Mensagens;