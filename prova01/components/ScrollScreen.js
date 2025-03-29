import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlatListScreen from './scroll/FlatListScreen';
import FormScreen from './scroll/FormScreen';
import SectionListScreen from './scroll/SectionListScreen';

const Tab = createBottomTabNavigator();

const ScrollScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="FlatList" component={FlatListScreen} />
      <Tab.Screen name="Formulário" component={FormScreen} />
      <Tab.Screen name="SectionList" component={SectionListScreen} />
    </Tab.Navigator>
  );
};

export default ScrollScreen;