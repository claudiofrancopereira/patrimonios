import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PatrimoniosMap from './pages/PatrimoniosMap';
import PatrimonioDetails from './pages/PatrimonioDetails';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen 
                    name="PatrimoniosMap" 
                    component={PatrimoniosMap} 
                />

                <Screen
                    name="PatrimonioDetails"
                    component={PatrimonioDetails}
                />
            </Navigator>
        </NavigationContainer>
    )
}