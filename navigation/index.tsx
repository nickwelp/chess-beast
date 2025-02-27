/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/HomeScreen';
// import TabTwoScreen from '../screens/TabTwoScreen';
import ChessGame from '../screens/ChessGame';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import SettingsScreen from '../screens/SettingsScreen';
import ChessPeices from '../components/ChessPieces';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const {
    BlackBishop, BlackKing, BlackKnight, BlackPawn, BlackQueen, BlackRook,
    WhiteBishop, WhiteKing, WhiteKnight, WhitePawn, WhiteQueen, WhiteRook
  } = ChessPeices;

  return (
      <BottomTab.Navigator
        initialRouteName="TabOne"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
        }}>
        <BottomTab.Screen
          name="TabOne"
          component={TabOneScreen}
          options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
            title: 'Home',
            tabBarIcon: ({ color }) => <BlackKing style={{fontSize:230}}/>,
            // headerRight: () => (
            //   <Pressable
            //     onPress={() => navigation.navigate('Modal')}
            //     style={({ pressed }) => ({
            //       opacity: pressed ? 0.5 : 1,
            //     })}>
            //     <FontAwesome
            //       name="info-circle"
            //       size={25}
            //       color={Colors[colorScheme].text}
            //       style={{ marginRight: 15 }}
            //     />
            //   </Pressable>
            // ),
          })}
        />
        <BottomTab.Screen
          name="TabTwo"
          component={ChessGame}
          options={({ navigation }: RootTabScreenProps<'TabTwo'>) => ({
            title: 'Game Board',
            tabBarIcon: ({ color }) =><WhiteQueen style={{fontSize:230}} />
          })}
        />
        <BottomTab.Screen
          name="TabThree"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <BlackBishop style={{fontSize:230}}/>,
          }}
        />
      </BottomTab.Navigator>
  );
}

