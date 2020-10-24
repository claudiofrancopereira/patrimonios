import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PatrimoniosMap from './pages/PatrimoniosMap';
import PatrimonioDetails from './pages/PatrimonioDetails';
import SelectMapPosition from './pages/CreatePatrimonio/SelectMapPosition';
import PatrimonioData from './pages/CreatePatrimonio/PatrimonioData';

import Header from './components/header';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5'} }}>
                <Screen 
                    name="PatrimoniosMap" 
                    component={PatrimoniosMap} 
                />

                <Screen
                    name="PatrimonioDetails"
                    component={PatrimonioDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Detalhes do Patrimonio" />
                    }}
                />

                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no mapa" />
                    }}
                />
                
                <Screen
                    name="PatrimonioData"
                    component={PatrimonioData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />
                    }}
                />

            </Navigator>
        </NavigationContainer>
    )
}