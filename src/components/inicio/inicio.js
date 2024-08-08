import React, { useEffect, useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Midia from '../midia/midia';
import Mensagens from '../mensagens/mensagens';
import Agenda from '../agenda/agenda';
import styles from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#092845', height: 55},
        tabBarActiveTintColor: 'white'}}>
      <Tab.Screen 
      name="Início" 
      component={Inicio}
      options={{
        tabBarLabel: 'Início',
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: '#06C8F2',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={40}  marginTop={1.5}/>
        ),
      }}
      />
      <Tab.Screen 
      name="Mídia" 
      component={Midia} 
      options={{
        tabBarLabel: 'Mídia',
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: '#06C8F2',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="camera" color={color} size={38} marginTop={3}/>
        ),
      }}
      />
      <Tab.Screen 
      name="Mensagens" 
      component={Mensagens} 
      options={{
        tabBarLabel: 'Mensagens',
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: '#06C8F2',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="message" color={color} size={35} marginTop={3.5}/>
        ),
      }}
      />
      <Tab.Screen 
      name="Agenda" 
      component={Agenda} 
      options={{
        tabBarLabel: 'Agenda',
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: '#06C8F2',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="calendar" color={color} size={35} marginTop={3.5}/>
        ),
      }}
      />
    </Tab.Navigator>
  );
}


const Inicio = () => {

  return (
    <View>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.user}>
          <MaterialCommunityIcons name="account-circle" color="white" size={44}  />
          <Text style={styles.userText}>Usuário</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
      </ScrollView>
    </View>
 
  );
};

export default MyTabs;