import React from 'react';
import Logo from '../../src/components/logo/logo';
import Login from '../../src/components/login/login';
import Cad from '../../src/components/cad/cad';
import Tipo from '../../src/components/tipo/tipo';
import Relacao from '../../src/components/relacao/relacao';
import Inicio from '../../src/components/inicio/inicio';
import Midia from '../../src/components/midia/midia';
import Agenda from '../../src/components/agenda/agenda';
import Mensagens from '../../src/components/mensagens/mensagens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Connect from '../../src/components/connect/connect';
import Carregamento from '../../src/components/carregamento/carregamento';
const Stack = createNativeStackNavigator();

const YourApp = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Carregamento"
          component={Carregamento}
        />
        <Stack.Screen
          name="Logo"
          component={Logo}
        />
        <Stack.Screen
          name="Tipo"
          component={Tipo}
        />
        <Stack.Screen
          name="Relacao"
          component={Relacao}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Cad"
          component={Cad}
        />
        <Stack.Screen
          name="Inicio"
          component={Inicio}
        />
        <Stack.Screen
          name="Midia"
          component={Midia}
        />
        <Stack.Screen
          name="Mensagens"
          component={Mensagens}
        />
        <Stack.Screen
          name="Agenda"
          component={Agenda}
        />
        <Stack.Screen
          name="Connect"
          component={Connect}
        />
      </Stack.Navigator>
  );
};

export default YourApp;