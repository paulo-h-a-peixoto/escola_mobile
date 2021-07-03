import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WallScreen from '../screens/WallScreen';
import DocumentScreen from '../screens/DocumentScreen';
import BilletScreen from '../screens/BilletScreen';
import WarningScreen from '../screens/WarningScreen';
import WarningAddScreen from '../screens/WarningAddScreen';
import WarningEditScreen from '../screens/WarningEditScreen';
import AvisoScreen from '../screens/AvisoScreen';
import AvisoAddScreen from '../screens/AvisoAddScreen';
import AvisoEditScreen from '../screens/AvisoEditScreen';
import ReservationMedico from '../screens/ReservationMedico';
import ReservationScreen from '../screens/ReservationScreen';
import ReservationAddScreen from '../screens/ReservationAddScreen';
import ReservationMyScreen from '../screens/ReservationMyScreen';
import FoundAndLostScreen from '../screens/FoundAndLostScreen';
import FoundAndLostAddScreen from '../screens/FoundAndLostAddScreen';
import UnitScreen from '../screens/UnitScreen';
import VideoScreen from '../screens/VideoScreen';
import AlunoScreen from '../screens/AlunoScreen';
import HomologacaoScreen from '../screens/HomologacaoScreen';
import VideoHomologacaoScreen from '../screens/VideoHomologacaoScreen';
import VideoAssistirScreen from '../screens/VideoAssistirScreen';
import AssistirScreen from '../screens/AssistirScreen';


import DrawerCustom from '../components/DrawerCustom';

const Drawer = createDrawerNavigator();

export default () => {
    return (
        <Drawer.Navigator
            drawerContent={(props)=><DrawerCustom {...props} />}
            screenOptions={{
                headerShown: true,
                headerTitle: '',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowOpacity: 0,
                    elevation: 0
                }
            }}
        >
            <Drawer.Screen
                name="WallScreen"
                component={WallScreen}
            />
            <Drawer.Screen
                name="DocumentScreen"
                component={DocumentScreen}
            />
            <Drawer.Screen
                name="HomologacaoScreen"
                component={HomologacaoScreen}
            />
            <Drawer.Screen
                name="BilletScreen"
                component={BilletScreen}
            />
            <Drawer.Screen
                name="WarningScreen"
                component={WarningScreen}
            />
            <Drawer.Screen
                name="WarningAddScreen"
                component={WarningAddScreen}
            />
            <Drawer.Screen
                name="WarningEditScreen"
                component={WarningEditScreen}
            />
            <Drawer.Screen
                name="AvisoScreen"
                component={AvisoScreen}
            />
            <Drawer.Screen
                name="AvisoAddScreen"
                component={AvisoAddScreen}
            />
            <Drawer.Screen
                name="AvisoEditScreen"
                component={AvisoEditScreen}
            />
            <Drawer.Screen
                name="ReservationScreen"
                component={ReservationScreen}
            />
            <Drawer.Screen
                name="ReservationMedico"
                component={ReservationMedico}
            />
           
            <Drawer.Screen
                name="ReservationAddScreen"
                component={ReservationAddScreen}
            />
            <Drawer.Screen
                name="ReservationMyScreen"
                component={ReservationMyScreen}
            />
            <Drawer.Screen
                name="FoundAndLostScreen"
                component={FoundAndLostScreen}
            />
            <Drawer.Screen
                name="AlunoScreen"
                component={AlunoScreen}
            />
            <Drawer.Screen
                name="FoundAndLostAddScreen"
                component={FoundAndLostAddScreen}
            />
            <Drawer.Screen
                name="UnitScreen"
                component={UnitScreen}
            />
            <Drawer.Screen
                name="VideoScreen"
                component={VideoScreen}
            />
            <Drawer.Screen
                name="VideoHomologacaoScreen"
                component={VideoHomologacaoScreen}
            />
            <Drawer.Screen
                name="AssistirScreen"
                component={AssistirScreen}
            />
            <Drawer.Screen
                name="VideoAssistirScreen"
                component={VideoAssistirScreen}
            />
        </Drawer.Navigator>
    );
}