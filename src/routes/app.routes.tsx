import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Dashboard } from '../pages/Dashboard';
import { ItensCart } from '../pages/ItensCart';

export type RootStackParamList = {
  Dashboard: undefined;
  ItensCart: undefined;
}

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen 
        name="Dashboard"
        component={Dashboard}
      />
      <Screen 
        name="ItensCart"
        component={ItensCart}
      />
    </Navigator>
  )
}