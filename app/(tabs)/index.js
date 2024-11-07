import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontSizeProvider } from './FontSizeContext';
import Logo from '../../src/components/logo/logo';
import Login from '../../src/components/login/login';
import Cad from '../../src/components/cad/cad';
import Tipo from '../../src/components/tipo/tipo';
import Relacao from '../../src/components/relacao/relacao';
import Inicio from '../../src/components/inicio/inicio';
import Midia from '../../src/components/midia/midia';
import Mensagens from '../../src/components/mensagens/mensagens';
import Connect from '../../src/components/connect/connect';
import Carregamento from '../../src/components/carregamento/carregamento';
import User from '../../src/components/user/user';
import Dados from '../../src/components/dados/dados';
import EditarDados from '../../src/components/editarDados/editarDados';
import SelecionarMidia from '../../src/components/selecionarMidia/selecionarMidia';
import Chat from '../../src/components/chat/chat';
import Letra from '../../src/components/letra/letra';
import ChatMidias from '../../src/components/chatmidias/chatmidias';

const Stack = createNativeStackNavigator();

const YourApp = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Carregamento" component={Carregamento} />
        <Stack.Screen name="Logo" component={Logo} />
        <Stack.Screen name="Tipo" component={Tipo} />
        <Stack.Screen name="Relacao" component={Relacao} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cad" component={Cad} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Midia" component={Midia} />
        <Stack.Screen name="Mensagens" component={Mensagens} />
        <Stack.Screen name="Connect" component={Connect} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Dados" component={Dados} />
        <Stack.Screen name="EditarDados" component={EditarDados} />
        <Stack.Screen name="SelecionarMidia" component={SelecionarMidia} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Letra" component={Letra} />
        <Stack.Screen name="ChatMidias" component={ChatMidias} />
      </Stack.Navigator>
  );
};

export default YourApp;
