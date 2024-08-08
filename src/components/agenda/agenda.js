import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Agenda = () => {
  return (
    <View>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.user}>
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

export default Agenda;