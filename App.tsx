import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AppContext from './components/AppContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

/*
          CONTRA TORRENTEM
+-------------------------------------+
|                 ___                 |
|    __.--/)  .-~~   ~~>>>>>>>>   .-. |
|   (._\~  \ (        ~~>>>>>>>>.~.-' |
|     -~}   \_~-,    )~~>>>>>>>' /    |
|       {     ~/    /~~~~~~. _.-~     |
|        ~.(   `--~~/      /~ ~.      |
|   .--~~~~_\  \--~(   -.-~~-.  \     |
|   ```-'~~ /  /    ~-.  \ .--~ /     |
|        (((_.'    (((__.' ```-'      |
+-------------------------------------+
          TREU BIS IN TOD
*/


export default function App() {
  const [ difficulty, setDifficulty ] = React.useState(2);
  const [ timeLimit, setTimeLimit ] = React.useState(30);
  const [ strikeLimit, setStrikeLimit ] = React.useState(3);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <AppContext.Provider value={{difficulty, setDifficulty, timeLimit, setTimeLimit, strikeLimit, setStrikeLimit}}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </AppContext.Provider>
      </GestureHandlerRootView>
    );
  }
}
